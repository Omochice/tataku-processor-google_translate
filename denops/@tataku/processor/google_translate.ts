import { Denops } from "https://deno.land/x/denops_std@v5.0.1/mod.ts";
import { GTR } from "https://deno.land/x/gtr@v0.0.1/mod.ts";
import { $object, $string, access } from "https://esm.sh/lizod@0.2.6/";

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
      const { trans } = await gtr.translate(chunk.join("\n"), {
        sourceLang: option.source,
        targetLang: option.target,
      });

      controller.enqueue(trans.split("\n"));
    },
  });
};

export default processor;
