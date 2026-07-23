const { withProjectBuildGradle } = require('@expo/config-plugins');

/**
 * Expo Config Plugin: withEntrupyMaven
 *
 * Entrupy Android SDK'sı GitHub Packages üzerinden dağıtılıyor.
 * Bu plugin Android proje build.gradle'ına gerekli Maven repository'yi ekler.
 *
 * Kimlik doğrulama EAS build ortamındaki env variable'lardan alınır:
 *  - GITHUB_USER: GitHub kullanıcı adı
 *  - GITHUB_TOKEN: read:packages scope'lu GitHub Personal Access Token
 */
module.exports = function withEntrupyMaven(config) {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      const entrupyMavenBlock = `
    maven {
      url 'https://maven.pkg.github.com/entrupy/entrupy-sdk-android'
      credentials {
        username = System.getenv("GITHUB_USER") ?: ""
        password = System.getenv("GITHUB_TOKEN") ?: ""
      }
    }`;

      // Zaten eklenmiş mi kontrol et (idempotent)
      if (config.modResults.contents.includes('maven.pkg.github.com/entrupy/entrupy-sdk-android')) {
        console.log('[withEntrupyMaven] Entrupy Maven repository zaten mevcut, atlanıyor.');
        return config;
      }

      // allprojects.repositories bloğuna ekle
      const allProjectsRegex = /allprojects\s*\{\s*repositories\s*\{/;
      if (allProjectsRegex.test(config.modResults.contents)) {
        config.modResults.contents = config.modResults.contents.replace(
          allProjectsRegex,
          `allprojects {\n  repositories {\n${entrupyMavenBlock}`
        );
        console.log('[withEntrupyMaven] Entrupy Maven repository allprojects.repositories bloğuna eklendi.');
      } else {
        console.warn('[withEntrupyMaven] allprojects.repositories bloğu bulunamadı — build.gradle yapısını kontrol edin.');
      }
    }
    return config;
  });
};
