import { Denops } from "jsr:@denops/std@8.2.0";
import { GTR } from "https://deno.land/x/gtr@v0.0.1/mod.ts";
import { assert, is, type Predicate } from "jsr:@core/unknownutil@4.3.0";
import type { ProcessorFactory } from "jsr:@omochice/tataku-vim@1.2.1";

type Option = {
  source: string;
  target: string;
};

const isOption = is.ObjectOf({
  source: is.String,
  target: is.String,
}) satisfies Predicate<Option>;

const processor: ProcessorFactory = (_: Denops, option: unknown) => {
  assert(option, isOption);
  const gtr = new GTR();
  return new TransformStream<string[]>({
    transform: async (chunk: string[], controller) => {
      const { trans } = await gtr.translate(chunk.join(""), {
        sourceLang: option.source,
        targetLang: option.target,
      });

      controller.enqueue(trans.split(/\r?\n/).map((e) => `${e}\n`));
    },
  });
};

export default processor;
