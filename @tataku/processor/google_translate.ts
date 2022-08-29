import { Denops } from "https://deno.land/x/denops_std@v3.8.1/mod.ts";
import { GTR } from "https://deno.land/x/gtr@v0.0.1/mod.ts";
import {
  isObject,
  isString,
} from "https://deno.land/x/unknownutil@v2.0.0/mod.ts";

export async function run(
  denops: Denops,
  options: Record<string, unkown>,
  source: string[],
): Promise<string[]> {
  if (!isOption(options)) {
    throw new Error(`Option must have "source" and "target" property.`);
  }

  const gtr = new GTR();
  const { trans } = await gtr.translate(source.join("\n"), {
    sourceLang: options.source,
    targetLang: options.target,
  });

  return trans.split("\n");
}

type Option = {
  source: string;
  target: string;
};

function isOption(x): x is Option {
  return isObject(x, isString) && "source" in x && "target" in x;
}
