import {
   ACTIVITY_ARR,
   HERO_CLASS_ARR,
   HERO_RACE_ARR,
   RESOURCE_ARR,
   SKILL_ARR,
   STAT_ARR,
} from '@/CONST';
import type {
   HeroClass,
   HeroData,
   HeroRace,
   Stat,
   SkillsData,
   SkillData,
   Skill,
   Activity,
   ActivityData,
   ActivitiesData,
   Resource,
} from '@/types';
import {
   randArrPick,
   randInt,
   randRecPick,
   filledRec,
   mapValue,
   rand,
} from '@/utilities';
import { Item } from '@/classes/_index';
import { faker } from '@faker-js/faker';
import {
   ACTIVITY_TO_SKILL,
   BASE_RESOURCES,
   HERO_ID_MAP,
   RESOURCE_TO_SKILL,
   SKILL_TO_RESOURCE,
   SKILL_TO_STAT,
   STAT_TO_SKILL,
} from '@/data';

export default class Hero extends Item {
   /* 🗿 PROPERTIES */
   public name: string;
   public readonly race: HeroRace;
   public readonly class: HeroClass;
   public skills: SkillsData;
   public activities: ActivitiesData;

   public skillRequirements = filledRec(0, ...SKILL_ARR);
   public stats = filledRec(0, ...STAT_ARR);
   public resources = filledRec({ amount: 0, total: 0 }, ...RESOURCE_ARR);
   public activityInfo = filledRec({ rate: 10, drop: 1 }, ...ACTIVITY_ARR);

   /* 🔧 UTILITY */
   private computeAll() {
      STAT_ARR.forEach(s => this.computeStatValue(s));
      RESOURCE_ARR.forEach(r => this.computeResource(r));
      SKILL_ARR.forEach(s => this.computeRequiredXP(s));
      this.computeValue();
   }

   /**
    * TODO:
    *    apply other factors like race and class
    */
   private computeStatValue(stat: Stat) {
      // getting skills that affect this stat
      let skill_multipliers = STAT_TO_SKILL[stat];
      let sum = 0;

      for (const s in skill_multipliers) {
         let skillName = s as Skill;
         let skillLevel = this.skills[skillName].level;
         let multiplier = skill_multipliers[skillName] as number;

         sum += skillLevel * multiplier;
      }

      this.stats[stat] = sum;
   }
   private computeRequiredXP(skill: Skill) {
      let { level } = this.skills[skill];
      this.skillRequirements[skill] = 50 + level ** 1.25;
   }

   once = true;

   private computeResource(resource: Resource) {
      let skill_multipliers = RESOURCE_TO_SKILL[resource];
      let sum = BASE_RESOURCES[resource];

      for (const s in skill_multipliers) {
         let skillName = s as Skill;
         let skillLevel = this.skills[skillName].level;
         let multiplier = skill_multipliers[skillName] as number;

         sum += skillLevel * multiplier;
      }

      this.resources[resource].total = sum;
      this.resources[resource].amount = rand(0, sum);
      this.once = false;
   }

   private computeValue() {
      // this.value += 1;
   }

   /* 🏭 FACTORY */
   public static random() {
      let skills = {} as SkillsData;

      SKILL_ARR.forEach(s => {
         let info: SkillData = {
            level: randInt(0, 25),
            xp: randInt(0, 49),
         };
         skills[s] = info;
      });

      let activities = {} as ActivitiesData;

      ACTIVITY_ARR.forEach(a => {
         let info: ActivityData = {
            level: randInt(0, 50),
            xp: randInt(0, 50),
         };
         activities[a] = info;
      });

      let race = randArrPick(HERO_RACE_ARR);

      return new Hero({
         id: HERO_ID_MAP[race],
         name: faker.name.firstName(),
         race: race,
         class: randArrPick(HERO_CLASS_ARR),
         skills: skills,
         activities: activities,
      });
   }

   /* 🔨 CONSTRUCTOR */
   private constructor(data: HeroData) {
      let { id, name, race, class: hClass, skills, activities } = data;
      super('hero', id, 1);
      this.name = name;
      this.race = race;
      this.class = hClass;
      this.skills = skills;
      this.activities = activities;

      this.computeAll();
   }

   /* 🔎 GETTERS */
   public getSkillData(skill: Skill) {
      let { level, xp: current } = this.skills[skill];
      let total = this.skillRequirements[skill];
      let progress = mapValue([0, total], [0, 100], current);
      return {
         level: level,
         current: current,
         total: total,
         progress: progress,
      };
   }

   public getStatData(stat: Stat) {
      let current = this.stats[stat];
      return {
         current: current,
      };
   }

   /* 📐 SETTERS */
   public increaseSkillLevel(skill: Skill, amount: number = 1) {
      this.skills[skill].level++;

      this.computeRequiredXP(skill);

      let stat_multipliers = SKILL_TO_STAT[skill];
      for (const statName in stat_multipliers) {
         let stat = statName as Stat;
         this.computeStatValue(stat);
      }
      let resource_multipliers = SKILL_TO_RESOURCE[skill];
      for (const resourceName in resource_multipliers) {
         let resource = resourceName as Resource;
         this.computeResource(resource);
      }
   }

   public addXP(amount: number, activity: Activity) {
      let skill_multipliers = ACTIVITY_TO_SKILL[activity];
      for (const skillName in skill_multipliers) {
         let skill = skillName as Skill;
         let multiplier = skill_multipliers[skill] as number;

         let { xp } = this.skills[skill];
         let requiredExp = this.skillRequirements[skill];
         let step = amount * multiplier;
         let total = xp + step;

         if (total >= requiredExp) {
            // Amount overflows
            let remainder = total - requiredExp;
            this.increaseSkillLevel(skill);
            this.skills[skill].xp = remainder;
         } else {
            this.skills[skill].xp += step;
         }
      }
   }

   // TODO: streamline
   public getRaceIcon() {
      let icon = '';

      switch (this.class) {
         case 'knight':
            icon = 'sword';
            break;
         case 'archer':
            icon = 'bow';
            break;
         case 'mage':
            icon = 'wand';
            break;
      }

      return `src/assets/icons/${icon}.svg`;
   }
}
