import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      mainColor: string;
      subColor: string;
      fontColor: string;
      background: string;
    };
  }
}
