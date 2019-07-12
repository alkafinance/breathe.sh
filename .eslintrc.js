/** @type {import('@alkafinance/eslint-config/eslint').ESLintConfig} */
module.exports = {
  extends: [
    '@alkafinance/eslint-config',
    '@alkafinance/eslint-config-typescript',
    '@alkafinance/eslint-config-react/web',
    '@alkafinance/eslint-config-typescript/react',
  ],
  rules: {
    // http://eslint.org/docs/rules
    'global-require': 'off',
  },
  overrides: [
    {
      files: ['*.js', '**/.*.js'],
      ...require('@alkafinance/eslint-config/script'),
    },
    {
      files: ['@types/*.d.ts'],
      ...require('@alkafinance/eslint-config-typescript/dts-react'),
    },
  ],
}
