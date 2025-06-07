const fileModules = import.meta.glob('../gameFile/*/*.csv', {
  eager: false,
  as: 'raw',
});

console.log('🔍 所有可載入的 CSV 檔案：', Object.keys(fileModules));

const fileMap = {};

for (const path in fileModules) {
  const match = path.match(/\/gameFile\/([^/]+)\/\1 - ([^.]+)\.csv$/);
  if (!match) {
    console.warn('❌ 不符合命名規則，略過：', path);
    continue;
  }

  const folder = match[1];
  const type = match[2];

  if (!fileMap[folder]) {
    fileMap[folder] = {};
  }

  fileMap[folder][type] = fileModules[path];

  console.log(`✅ 加入檔案：「${folder}」遊戲中的「${type}.csv」`, path);
}

export const getGameFolders = () => {
  console.log('📁 可用的遊戲資料夾：', Object.keys(fileMap));
  return Object.keys(fileMap);
};

export const loadGameData = async (folderName) => {
  const loaders = fileMap[folderName];
  if (!loaders) throw new Error(`❌ 找不到遊戲資料夾：「${folderName}」`);

  console.log(`📦 開始載入遊戲資料夾：「${folderName}」`);

  const data = await Promise.all([
    loaders.character?.(),
    loaders.hint?.(),
    loaders.mission?.(),
    loaders.prop?.(),
    loaders.rundown?.(),
    loaders.story?.(),
    loaders.config?.(),
  ]);

  console.log(`✅ 載入完成：「${folderName}」`);

  return {
    characterCsvFile: data[0],
    hintCsvFile: data[1],
    missionCsvFile: data[2],
    propCsvFile: data[3],
    rundownCsvFile: data[4],
    storyCsvFile: data[5],
    configCsvFile: data[6],
  };
};
