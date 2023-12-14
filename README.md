# tataku-processor-google_translate 

The processor module that translate by google-translate.

## Contents 

- [Dependencies](tataku-processor-google_translate-dependencies)
- [Options](tataku-processor-google_translate-options)
- [Samples](tataku-processor-google_translate-samples)

## Dependencies 

This plugin needs:

- [denops.vim](https://github.com/vim-denops/denops.vim)
- [tataku.vim](https://github.com/Omochice/tataku.vim)

## Options 

This module has some options.

- `source` 

  Source language.
  See: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale)
- `target`

  Target language.
  See: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale)
- `source` 

## Samples 

```vim
let g:tataku_recipes = #{
  \   sample: #{
  \     processor: #{
  \       name: 'google_translate',
  \       options: #{
  \         source: 'en',
  \         source: 'ja',
  \       },
  \     }
  \   }
  \ }
```

