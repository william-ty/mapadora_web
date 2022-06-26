import * as Svgs from "../../img/sprites/index";

type LogoProps = {
  height: string;
};

export const Logo = (props: LogoProps) => {
  return (
    <>
      <Svgs.MapadoraLogoFlat height={props.height} />
    </>
  );
};
