import { Box } from "@mui/material";
import { Show } from "@sr/common/components/Show";
import { Button } from "@sr/common/iu/components/Button";
import { UnderlineTabsProps } from "@sr/common/types";

export function UnderlineTabs<T extends string>({
  options,
  activeTab,
  onChange,
}: UnderlineTabsProps<T>) {
  return (
    <Box className="relative flex flex-row justify-between border-b border-neutral-200 w-full pb-3 gap-3">
      <Box className="relative flex flex-row gap-3">
        {options.map((option) => {
          const isActive = activeTab === option.id;

          return (
            <Box key={option.id} className="relative">
              <Button
                onClick={() => onChange(option.id)}
                data-text={option.label}
                className={`py-3 px-4 text-base w-fit transition-all flex flex-col items-center justify-center
                after:block after:content-[attr(data-text)] after:font-semibold after:h-0 after:invisible after:overflow-hidden
                ${
                  isActive
                    ? "bg-neutral-100 text-neutral-900 font-semibold"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
                translateId={option.label}
              />

              <Show hidden={!isActive}>
                <Box className="absolute -bottom-3 left-0 w-full h-[3px] bg-primary rounded-t-lg z-10" />
              </Show>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
