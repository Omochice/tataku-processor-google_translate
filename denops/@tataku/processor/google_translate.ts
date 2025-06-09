import { Denops } from "jsr:@denops/std@7.5.1";
import { GTR } from "https://deno.land/x/gtr@v0.0.1/mod.ts";
import { $object, $string, access } from "npm:lizod@0.2.7";

const isOption = $object({
  source: $string,
  target: $string,
});

const processor = (_: Denops, option: unknown) => {
  const ctx = { errors: [] };
  if (!isOption(option, ctx)) {
    throw new Error(
      ctx.errors
        .map((e) => `error at ${e} ${access(option, e)}`)
        .join("\n"),
    );
  }
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
