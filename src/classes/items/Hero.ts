import { ActivityArr, HeroClassArr, HeroRaceArr, SkillArr, StatArr } from '@/CONST';
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
   SkillAllData,
} from '@/types';
import { randArrPick, randInt, randRecPick, filledRec } from '@/utilities';
import { Item } from '@/classes/_index';
import { faker } from '@faker-js/faker';
import { HERO_ID_MAP, RAW_ACTIVITY_GAINS, RAW_SKILL_GAINS, RAW_STAT_GAINS } from '@/data';

export default class Hero extends Item {
   /* 🗿 PROPERTIES */
   public name: string;
   public readonly race: HeroRace;
   public readonly class: HeroClass;
   public skills: SkillsData;
   public activities: ActivitiesData;

   public skillRequirements = filledRec(0, ...SkillArr);
   public stats = filledRec(0, ...StatArr);
   public activityInfo = filledRec({ rate: 10, drop: 1 }, ...ActivityArr);

   /* 🔧 UTILITY */
   private computeAll() {
      StatArr.forEach(s => this.computeStatValue(s));
      SkillArr.forEach(s => this.computeRequireXP(s));
      this.computeValue();
   }

   /**
    * TODO:
    *    apply other factors like race and class
    */
   private computeStatValue(stat: Stat) {
      // getting skills that affect this stat
      let skill_multipliers = RAW_STAT_GAINS[stat];
      let sum = 0;

      for (const s in skill_multipliers) {
         let skillName = s as Skill;
         let skillLevel = this.skills[skillName].level;
         let multiplier = skill_multipliers[skillName] as number;

         sum += skillLevel * multiplier;
      }

      this.stats[stat] = sum;
   }
   private computeRequireXP(skill: Skill) {
      let { level } = this.skills[skill];
      this.skillRequirements[skill] = 50 + level ** 1.25;
   }

   private computeValue() {
      // this.value += 1;
   }

   /* 🏭 FACTORY */
   public static random() {
      let skills = {} as SkillsData;

      SkillArr.forEach(s => {
         let info: SkillData = {
            level: randInt(0, 49),
            xp: randInt(0, 100),
         };
         skills[s] = info;
      });

      let activities = {} as ActivitiesData;

      ActivityArr.forEach(a => {
         let info: ActivityData = {
            level: randInt(0, 50),
            xp: randInt(0, 50),
         };
         activities[a] = info;
      });

      let race = randArrPick(HeroRaceArr);

      return new Hero({
         id: HERO_ID_MAP[race],
         name: faker.name.firstName(),
         race: race,
         class: randArrPick(HeroClassArr),
         skills: skills,
         activities: activities,
      });
   }

   private static once = true;

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

      if (Hero.once) {
         SkillArr.forEach(s => {
            let { xp, level } = this.skills[s];
            let required = this.skillRequirements[s];

            console.log(
               `Skill: ${s}, Level: ${level}, XP: ${xp.toFixed(
                  2
               )}, Required: ${required.toFixed(2)}`
            );
         });
         Hero.once = false;
      }
   }

   /* 🔎 GETTERS */
   public getSkillData(skill: Skill): SkillAllData {
      let { level, xp } = this.skills[skill];
      let required = this.skillRequirements[skill];
      return {
         name: skill,
         level: level,
         xp: xp,
         required: required,
      };
   }

   /* 📐 SETTERS */
   public increaseSkillLevel(skill: Skill, amount: number = 1) {
      this.skills[skill].level++;

      this.computeRequireXP(skill);

      let stats = RAW_SKILL_GAINS[skill];
      for (const statName in stats) {
         let stat = statName as Stat;
         this.computeStatValue(stat);
      }
   }

   public addXP(amount: number, activity: Activity) {
      let skill_multipliers = RAW_ACTIVITY_GAINS[activity];
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
