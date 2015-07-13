/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';
import path from '../paths';
import {GH_PAGES_TOKEN, GH_PAGES_USERNAME, GH_PAGES_PROJECT_NAME} from '../const';

/**
 * Publish 'build' folder to GitHub 'gh-pages' branch.
 * To deploy with Travis CI:
 *   1. Generate OAuth token on GitHub > Settings > Application page
 *   2. Encrypt and save that token into the `.travis.yml` file by running:
 *      `travis encrypt GITHUB_TOKEN="<your-oauth-token>" --add`
 *
 * @return {Stream}
 */
gulp.task('gh-pages', () => {
    return gulp.src(path.build.basePath + '**/*')
        .pipe(ghPages({remoteUrl: `https://${GH_PAGES_TOKEN}@github.com/${GH_PAGES_USERNAME}/${GH_PAGES_PROJECT_NAME}.git`}));
});
