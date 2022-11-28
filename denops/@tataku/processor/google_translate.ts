import { Denops } from "https://deno.land/x/denops_std@v3.8.1/mod.ts";
import { GTR } from "https://deno.land/x/gtr@v0.0.1/mod.ts";
import {
  isObject,
  isString,
} from "https://deno.land/x/unknownutil@v2.0.0/mod.ts";
import { Processor } from "https://raw.githubusercontent.com/Omochice/tataku.vim/master/denops/tataku/interface.ts";

export default class implements Processor {
  private readonly gtr = new GTR();
  constructor(private readonly option: Record<string, unknown>) {
    if (!isOption(option)) {
      throw new Error(
        `option must have "source" and "target" field: ${
          JSON.stringify(option)
        }`,
      );
    }
  }

  async run(_denops: Denops, source: string[]) {
    const { trans } = await this.gtr.translate(source.join("\n"), {
      sourceLang: this.option.source,
      targetLang: this.option.target,
    });

    return trans.split("\n");
  }
}

type Option = {
  source: string;
  target: string;
};

function isOption(x): x is Option {
  return isObject(x, isString) && "source" in x && "target" in x;
}
