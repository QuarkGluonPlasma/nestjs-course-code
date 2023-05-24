import { ConfigurableModuleBuilder } from "@nestjs/common";

export interface CccModuleOptions {
    aaa: number;
    bbb: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<CccModuleOptions>().setClassMethodName('register').setExtras({
    isGlobal: true
  }, (definition, extras) => ({
    ...definition,
    global: extras.isGlobal,
  })).build();
