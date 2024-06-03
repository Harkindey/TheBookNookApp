module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\\\\\\\.tsx?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  // transform: {
  //   // '^.+\\.(ts|tsx)?$': 'babel-jest',
  //   // '^.+\\\\\\\\.tsx?$': 'ts-jest',
  // },
};
