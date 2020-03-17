// Copyright (C) 2020  Neruthes <neruthes.xyz>
// Licensed under GNU AGPL v3 <https://www.gnu.org/licenses/agpl-3.0.html>

const fs = require('fs');

const createEntry = function (t, repo, issue, title) {
    const render_github = function (repo, issue, title) {
        return `${repo}#${issue} | [${title}](https://github.com/${repo}/issues/${issue})`;
    };
    return render_github(repo, issue, title);
};

var list = JSON.parse(fs.readFileSync('data.json').toString()).list;

var listMD = list.map(function (entry) {
    return createEntry(entry.type, entry.repo, entry.issue, entry.title);
}).join('\n');

var tmpl = fs.readFileSync('README.tmpl.md').toString();
var finalMD = tmpl.replace('{{CONTENT}}', listMD);

fs.writeFileSync('README.md', finalMD);
