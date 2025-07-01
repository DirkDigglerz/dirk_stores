import React from "react";
import { Flex, type FlexProps } from "@mantine/core";
import { useSettings } from "../../stores/settings";

type CustomFlexProps = {
  children?: React.ReactNode;
} & FlexProps;

const CustomFlex = React.forwardRef<HTMLDivElement, CustomFlexProps>(
  (props, ref) => {
    const game = useSettings((state) => state.game);

    return (
      <Flex
        ref={ref}
        {...props}
        style={{
          // WebKit fallback for Chrome, Safari
          ...(game === "rdr3" ? 
            {
                WebkitMaskImage: "url(https://raw.githubusercontent.com/Jump-On-Studios/RedM-jo_libs/af7545b6840972aa403287280346bbd1b8c443aa/source-repositories/Menu/public/assets/images/background.png)",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                WebkitMaskComposite: "source-in",
            } : {}),
          ...props.style,
          // if game == 'rdr3' use the rdr3 mask

        }}
      />
    );
  }
);

CustomFlex.displayName = "CustomFlex";

export default CustomFlex;