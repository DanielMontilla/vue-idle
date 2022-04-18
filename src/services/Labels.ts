import { Label } from '@/classes/_index';
import type { LabelConfig } from '@/types';
import { ref, type Ref } from 'vue';

abstract class Labels {
   public static active = ref<number>(0);
   public static labels = ref<Label[]>([]);

   public static add({
      name,
      icon,
      color,
      unlocked = true,
      puchesable = true,
      price = 0,
   }: LabelConfig) {
      Labels.labels.value.push(new Label(name, icon, color, unlocked, puchesable, price));
   }

   public static addBatch(...labels: LabelConfig[]) {
      for (const label of labels) {
         let { name, icon, color, unlocked, puchesable, price } = label;
         Labels.add({ name, icon, color, unlocked, puchesable, price });
      }
   }

   public static getActive() {
      return Labels.labels.value[Labels.active.value];
   }

   public static isActive(label: Label | string) {
      if (typeof label === 'string') return Labels.getActive().name === label;
      return Labels.getActive().name === label.name;
   }

   public static setActive(label: Label | number) {
      if (typeof label === 'number') Labels.active.value = label;
      Labels.active.value = Labels.labels.value.findIndex(
         l => (label as Label).name === l.name
      );
   }
}

const useLabels = (active?: number, starting?: LabelConfig[]) => {
   if (active) Labels.active.value = active;
   if (starting) Labels.addBatch(...starting);

   return {
      labels: Labels.labels,
      add: Labels.add,
      addBatch: Labels.addBatch,
      active: Labels.active,
      getActive: Labels.getActive,
      isActive: Labels.isActive,
      setActive: Labels.setActive,
   };
};

export default useLabels;
