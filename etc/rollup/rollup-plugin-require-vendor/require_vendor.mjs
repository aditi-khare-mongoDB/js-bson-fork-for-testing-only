import MagicString from 'magic-string';

const REQUIRE_WEB_UTILS_POLYFILLS =
  `const { TextEncoder } = require('../vendor/text-encoding');
const { encode: btoa, decode: atob } = require('../vendor/base64');\n`

const REQUIRE_PARSE_UTF8_POLYFILLS = 
  `const { TextDecoder } = require('../vendor/text-encoding');\n`;

export class RequireVendor {
  /**
   * Take the compiled source code input; types are expected to already have been removed.
   * Add the TextEncoder, TextDecoder, atob, btoa requires.
   *
   * @param {string} code - source code of the module being transformed
   * @param {string} id - module id (usually the source file name)
   * @returns {{ code: string; map: import('magic-string').SourceMap }}
   */
  transform(code, id) {
    if (id.includes('parse_utf8')) {
      // MagicString lets us edit the source code and still generate an accurate source map
      const magicString = new MagicString(code);
      magicString.prepend(REQUIRE_PARSE_UTF8_POLYFILLS);

      return {
        code: magicString.toString(),
        map: magicString.generateMap({ hires: true })
      };
    } else if (id.includes('web_byte_utils')) {
      // MagicString lets us edit the source code and still generate an accurate source map
      const magicString = new MagicString(code);
      magicString.prepend(REQUIRE_WEB_UTILS_POLYFILLS);

      return {
        code: magicString.toString(),
        map: magicString.generateMap({ hires: true })
      };
    }
  }
}
