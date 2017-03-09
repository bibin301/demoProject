module.exports = '<ul class="nav nav-list abn-tree">\n <li \n ng-repeat="row in tree_rows | filter:{visible:true} track by row.branch._id" \n ng-animate="\'abn-tree-animate\'" \n ng-class="\'level-\' + {{ row.level }} + (row.branch._id == selectedid ? \' active\':\'\')" \n class="abn-tree-row">\n <a ng-click="user_clicks_branch(row.branch)">\n \n <table border=0 cellpadding=0 cellspacing=0 style="float:left;">\n <tr><td width=50%>\n <i \n ng-class="row.expand_icon" \n ng-show="row.expand_icon" \n ng-click="togglebranch(row.branch);$event.stopPropagation()" \n class="indented fa tree-icon"> </i>\n </td><td width=50%>\n \n <i ng-class="row.tree_icon" \n ng-click="togglebranch(row.branch);$event.stopPropagation()" \n class="indented fa tree-icon"></i>\n </td>\n </tr></table>\n \n <span class="indented tree-label" style="padding-left:5px;">{{ row._label }}</span>\n </a>\n </li>\n</ul>';