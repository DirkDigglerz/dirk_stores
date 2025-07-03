import { useEffect } from "react";
import SegmentedControl from "../Generic/SegmentedControl";
import { useStore } from "./useStore";

export default function Categories(){
  const categories = useStore((state) => state.categories);

  useEffect(() => {
    if (!categories) return;
    if (categories.length === 0) {
      useStore.setState({
        selectedCategory: undefined,
      });
    }
    // set the first category as selected
    if (!useStore.getState().selectedCategory) {
      useStore.setState({
        selectedCategory: categories[0].name,
      });
    }
  }, [categories]);

  const selectedCategory = useStore((state) => state.selectedCategory);

  return categories && (
    <SegmentedControl
      value={selectedCategory || categories[0].name}
      items={categories.map((category) => ({
        label: category.name.toUpperCase(),
        value: category.name,
        icon: category.icon,
      }))}

      onChange={(value) => {
        useStore.setState({
          selectedCategory: value as string,
        });
      }}
    />
  )
}