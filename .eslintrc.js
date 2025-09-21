module.exports = {
  extends: [
    '@expo/eslint-config-universe/native',
    '@expo/eslint-config-universe/typescript',
  ],
  rules: {
    // Personalizar reglas aquí
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};