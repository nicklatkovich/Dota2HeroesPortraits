const fs = require('fs');
const request = require('request');
const dota2heroes = require('./build/dota2heroes.json');

let download = (uri, filename, callback) => {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};
let portraitsTypes = ['full', 'large', 'small', 'vertical'];

let foldersToCreate = ['build', 'images', 'hero_portraits'];
for (let i = 1; i < foldersToCreate.length; i++) {
    foldersToCreate[i] = foldersToCreate[i - 1] + '/' + foldersToCreate[i];
}
portraitsTypes.forEach(function (element) {
    foldersToCreate.push(foldersToCreate[2] + '/' + element);
}, this);

console.log(foldersToCreate);

console.log('Creating folders...')
foldersToCreate.forEach(function (folder) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
}, this);

(async () => {
    for (let i = 0; i < portraitsTypes.length; i++) {
        let type = portraitsTypes[i];
        console.log('Downloading ' + type + ' portraits...');
        for (let j = 0; j < dota2heroes.heroes.length; j++) {
            let hero = dota2heroes.heroes[j];
            var pathForSave = 'build/images/hero_portraits/' + type + '/' + hero.name.substring(14) + '.png';
            await new Promise((resolve, reject) => {
                download(hero['url_' + type + '_portrait'], pathForSave, (err, res) => {
                    if (err) throw err;
                    resolve(res);
                });
            });
        }
    }
    console.log('Done!');
})();

