/*
App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter.extend();

//ROUTER.JS
App.Router.Map(function()   {
    this.resource('app', { path: '/' });
})

App.PositionsRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('positions');
    }
});



//MODELS.JS
App.Positions = DS.Model.extend({
    symbol: DS.attr('string'),
    position: DS.attr(),
    price: DS.attr(),
});

App.Positions.FIXTURES = [
 {
   id: 1,
   symbol: 'ASPS',
   position: 8000,
   price: 103.33,
 },
 {
   id: 2,
   symbol: 'OCN',
   position: 0,
   price: 28.2,
 },
 {
   id: 3,
   symbol: 'RESI',
   position: 52000,
   price: 25,
 },
];



//CONTROLLERS.JS

App.PositionController = Ember.ObjectController.extend({

});


*/

//IMPORT
App = Ember.Application.create();

App.Router.map(function() {
  this.resource('sortable');
  this.resource('financial');
  this.resource('hello');
});


App.SortableTableComponent = Ember.Table.EmberTableComponent.extend({
    onColumnSort: function (column, newIndex) {
        this._super(column, newIndex);
        console.log('column "' + column.get('headerCellName') + '" sorted');
    },

    actions: {
        sortByColumn: function (column) {
            this.sendAction('sortAction', column);
        }
    }
});
Ember.Handlebars.helper('sortable-table-component', App.SortableTableComponent);

App.SortableHeaderCellView = Ember.Table.HeaderCell.extend({
    templateName: 'sortable-header-cell'
});

App.SortableColumnMixin = Ember.Object.create({
    supportSort: true,
    sorted: false,
    headerCellViewClass: App.SortableHeaderCellView
});

App.SortableController = Ember.Controller.extend({
    page: 1,
    per_page: 30,
    sortAscending: false,
    sortColumn: null,
    content: Em.A(),

    columns: function () {
        return Em.A([
        Ember.Table.ColumnDefinition.create({
            columnWidth: 50,
            textAlign: 'text-align-left',
            headerCellName: 'State',
            contentPath: 'state'
        }),
        Ember.Table.ColumnDefinition.create({
            columnWidth: 200,
            textAlign: 'text-align-left',
            headerCellName: 'Title',
            contentPath: 'title'
        }),
        Ember.Table.ColumnDefinition.create(
        App.SortableColumnMixin, {
            columnWidth: 100,
            textAlign: 'text-align-center',
            headerCellName: '# Comments',
            contentPath: 'comments',
            sortKey: 'comments'
        }),
        Ember.Table.ColumnDefinition.create({
            columnWidth: 100,
            textAlign: 'text-align-left',
            headerCellName: 'Created By',
            contentPath: 'creator'
        }),
        Ember.Table.ColumnDefinition.create(
        App.SortableColumnMixin, {
            columnWidth: 100,
            textAlign: 'text-align-left',
            headerCellName: 'Updated At',
            contentPath: 'updatedAt',
            sortKey: 'updated_at'
        }),
        Ember.Table.ColumnDefinition.create(
        App.SortableColumnMixin, {
            columnWidth: 100,
            textAlign: 'text-align-left',
            headerCellName: 'Created At',
            contentPath: 'createdAt',
            sortKey: 'created_at'
        }),
        Ember.Table.ColumnDefinition.create({
            columnWidth: 100,
            textAlign: 'text-align-left',
            headerCellName: 'Created At',
            contentPath: 'longLine'
        })]);
    }.property(),

    createGithubIssue: function (event) {
        var row = Ember.Object.create();
        row.set('state', event.state);
        row.set('createdAt', event.created_at);
        row.set('updatedAt', event.updated_at);
        row.set('creator', event.user.login);
        row.set('title', event.title);
        row.set('comments', event.comments);
        row.set('longLine', JSON.stringify(event));
        return row;
    },

    requestGithubIssues: function () {
        var page, content, url, i, self = this;
        page = this.get('page');
        content = this.get('content');
        content.clear();
        if (true) {
            url = "https://api.github.com/repos/emberjs/ember.js/issues?page=" + page + "&per_page=30";
            if (this.get('sortColumn')) {
              var asc = this.get('sortAscending');
              url = url + '&direction=' + (asc ? 'asc' : 'desc');
              url = url + '&sort=' + this.get('sortColumn.sortKey');
            }
            url = url + '&callback=?';
            Ember.$.getJSON(url, function (json) {
                var a = json.data.map(function (event, index) {
                    return self.createGithubIssue(event);
                });
                content.pushObjects(a);
            });
        } else {
            for (i = 0; i != 30; i++) {
                issue = self.createGithubIssue({
                    'state': 'a',
                    'created_at': 'today',
                    'user': {
                        'login': 'me'
                    },
                    'updated_at': 'today',
                    'comments': i,
                    'title': 'Big Bug'
                });
                content.pushObject(issue);
            }
        }
    }.on('init').observes('page', 'sortColumn', 'sortAscending'),

    hasPreviousPage: Ember.computed.notEmpty('previousPageLink'),
    hasNextPage: Ember.computed.notEmpty('nextPageLink'),

    actions: {
        nextPage: function () {
            this.incrementProperty('page');
        },
        previousPage: function () {
            this.decrementProperty('page');
        },
        sort: function (column) {
            if (!column.get('supportSort')) {
                return;
            }

            if (this.get('sortColumn') !== column) {
                console.log('New column');
                this.get('columns').setEach('sorted', false);
                column.set('sorted', true);
                this.set('sortAscending', false);
                this.set('sortColumn', column);
            } else if (this.get('sortColumn') === column) {
                console.log('Same column');
                // Handle disabling sorts
                if (this.get('sortAscending') === true) {
                    console.log('disabling sort');
                    this.set('sortColumn', undefined);
                    this.set('sortAscending', false);
                    this.get('columns').setEach('sorted', false);
                    column.set('sorted', false);
                    return;
                } else {
                  console.log('change sort');
                  this.toggleProperty('sortAscending');
                }
            }
        }
    }


});



// HELLO TABLE
App.HelloController = Ember.Controller.extend({
  numRows: 1,
  columns: Ember.computed(function() {
    var closeColumn, dateColumn, highColumn, lowColumn, openColumn;
    dateColumn = Ember.Table.ColumnDefinition.create({
      columnWidth: 150,
      textAlign: 'text-align-left',
      headerCellName: 'Date',
      getCellContent: function(row) {
        return row['date'].toDateString();
      }
    });
    openColumn = Ember.Table.ColumnDefinition.create({
      columnWidth: 100,
      headerCellName: 'Open',
      getCellContent: function(row) {
        return row['open'].toFixed(2);
      }
    });
    highColumn = Ember.Table.ColumnDefinition.create({
      columnWidth: 100,
      headerCellName: 'High',
      getCellContent: function(row) {
        return row['high'].toFixed(2);
      }
    });
    lowColumn = Ember.Table.ColumnDefinition.create({
      columnWidth: 100,
      headerCellName: 'Low',
      getCellContent: function(row) {
        return row['low'].toFixed(2);
      }
    });
    closeColumn = Ember.Table.ColumnDefinition.create({
      columnWidth: 100,
      headerCellName: 'Close',
      getCellContent: function(row) {
        return row['close'].toFixed(2);
      }
    });
    return [dateColumn, openColumn, highColumn, lowColumn, closeColumn];
  }),


  content: Ember.computed(function() {
    var _i, _ref, _results;
    return (function() {
      _results = [];
      for (var _i = 0, _ref = this.get('numRows'); 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this).map(function(index) {
      var date;
      date = new Date();
      date.setDate(date.getDate() + index);
      return {
        date: date,
        open: Math.random() * 100 - 50,
        high: Math.random() * 100 - 50,
        low: Math.random() * 100 - 50,
        close: Math.random() * 100 - 50,
        volume: Math.random() * 1000000
      };
    });
  }).property('numRows')
});



// FINANCIAL TABLE
/*
App.FinancialTableCell = Ember.Table.TableCell.extend({
  templateName: 'financial_table_cell'
});

App.FinancialTableHeaderCell = Ember.Table.HeaderCell.extend({
  templateName: 'financial_table_header_cell'
});

App.FinancialTableTreeCell = Ember.Table.TableCell.extend({
  templateName: 'financial_table_tree_cell',
  classNames: 'ember-table-table-tree-cell',
  paddingStyle: Ember.computed(function() {
    return "padding-left:" + (this.get('row.indentation')) + "px;";
  }).property('row.indentation')
});

App.FinancialTableHeaderTreeCell = Ember.Table.HeaderCell.extend({
  templateName: 'financial_table_header_tree_cell',
  classNames: 'ember-table-table-header-tree-cell'
});

App.FinancialTableComponent = Ember.Table.EmberTableComponent.extend({
  numFixedColumns: 1,
  isCollapsed: false,
  isHeaderHeightResizable: true,
  rowHeight: 30,
  hasHeader: true,
  hasFooter: true,
  headerHeight: 70,
  sortAscending: false,
  sortColumn: null,
  actions: {
    toggleTableCollapse: function(event) {
      var children, isCollapsed;
      this.toggleProperty('isCollapsed');
      isCollapsed = this.get('isCollapsed');
      children = this.get('root.children');
      if (!(children && children.get('length') > 0)) {
        return;
      }
      children.forEach(function(child) {
        return child.recursiveCollapse(isCollapsed);
      });
      return this.notifyPropertyChange('rows');
    },
    toggleCollapse: function(row) {
      row.toggleProperty('isCollapsed');
      return Ember.run.next(this, function() {
        return this.notifyPropertyChange('rows');
      });
    }
  },
  data: null,
  columns: Ember.computed(function() {
    var columns, data, names;
    data = this.get('data');
    if (!data) {
      return;
    }
    names = this.get('data.value_factors').getEach('display_name');
    columns = names.map(function(name, index) {
      return Ember.Table.ColumnDefinition.create({
        index: index,
        headerCellName: name,
        headerCellViewClass: 'App.FinancialTableHeaderCell',
        tableCellViewClass: 'App.FinancialTableCell',
        getCellContent: function(row) {
          var object;
          object = row.values[this.get('index')];
          if (object.type === 'money') {
            return object.value.toCurrency();
          }
          if (object.type === 'percent') {
            return object.value.toPercent();
          }
          return "-";
        }
      });
    });
    columns.unshiftObject(this.get('groupingColumn'));
    return columns;
  }).property('data.valueFactors.@each', 'groupingColumn'),
  groupingColumn: Ember.computed(function() {
    var groupingFactors, name;
    groupingFactors = this.get('data.grouping_factors');
    name = groupingFactors.getEach('display_name').join(' ▸ ');
    return Ember.Table.ColumnDefinition.create({
      headerCellName: name,
      columnWidth: 400,
      isTreeColumn: true,
      isSortable: false,
      textAlign: 'text-align-left',
      headerCellViewClass: 'App.FinancialTableHeaderTreeCell',
      tableCellViewClass: 'App.FinancialTableTreeCell',
      contentPath: 'group_value'
    });
  }).property('data.grouping_factors.@each'),
  root: Ember.computed(function() {
    var data;
    data = this.get('data');
    if (!data) {
      return;
    }
    return this.createTree(null, data.root);
  }).property('data', 'sortAscending', 'sortColumn'),
  rows: Ember.computed(function() {
    var maxGroupingLevel, root, rows;
    root = this.get('root');
    if (!root) {
      return Ember.A();
    }
    rows = this.flattenTree(null, root, Ember.A());
    this.computeStyles(null, root);
    maxGroupingLevel = Math.max.apply(rows.getEach('groupingLevel'));
    rows.forEach(function(row) {
      return row.computeRowStyle(maxGroupingLevel);
    });
    return rows;
  }).property('root'),
  bodyContent: Ember.computed(function() {
    var rows;
    rows = this.get('rows');
    if (!rows) {
      return Ember.A();
    }
    rows = rows.slice(1, rows.get('length'));
    return rows.filterProperty('isShowing');
  }).property('rows'),
  footerContent: Ember.computed(function() {
    var rows;
    rows = this.get('rows');
    if (!rows) {
      return Ember.A();
    }
    return rows.slice(0, 1);
  }).property('rows'),
  orderBy: function(item1, item2) {
    var result, sortAscending, sortColumn, value1, value2;
    sortColumn = this.get('sortColumn');
    sortAscending = this.get('sortAscending');
    if (!sortColumn) {
      return 1;
    }
    value1 = sortColumn.getCellContent(item1.get('content'));
    value2 = sortColumn.getCellContent(item2.get('content'));
    result = Ember.compare(value1, value2);
    if (sortAscending) {
      return result;
    } else {
      return -result;
    }
  },
  createTree: function(parent, node) {
    var children, row;
    row = App.FinancialTableTreeTableRow.create();
    children = (node.children || []).map((function(_this) {
      return function(child) {
        return _this.createTree(row, child);
      };
    })(this));
    row.setProperties({
      isRoot: !parent,
      isLeaf: Ember.isEmpty(children),
      content: node,
      parent: parent,
      children: children,
      groupName: node.group_name,
      isCollapsed: false
    });
    return row;
  },
  flattenTree: function(parent, node, rows) {
    rows.pushObject(node);
    (node.children || []).forEach((function(_this) {
      return function(child) {
        return _this.flattenTree(node, child, rows);
      };
    })(this));
    return rows;
  },
  computeStyles: function(parent, node) {
    node.computeStyles(parent);
    return node.get('children').forEach((function(_this) {
      return function(child) {
        return _this.computeStyles(node, child);
      };
    })(this));
  }
});

App.FinancialTableTreeTableRow = Ember.Table.Row.extend({
  content: null,
  children: null,
  parent: null,
  isRoot: false,
  isLeaf: false,
  isCollapsed: false,
  isShowing: true,
  indentationSpacing: 20,
  groupName: null,
  computeStyles: function(parent) {
    var groupingLevel, indentType, indentation, isShowing, pGroupingLevel, spacing;
    groupingLevel = 0;
    indentation = 0;
    isShowing = true;
    if (parent) {
      isShowing = parent.get('isShowing') && !parent.get('isCollapsed');
      pGroupingLevel = parent.get('groupingLevel');
      groupingLevel = pGroupingLevel;
      if (parent.get('groupName') !== this.get('groupName')) {
        groupingLevel += 1;
      }
      indentType = groupingLevel === pGroupingLevel ? 'half' : 'full';
      spacing = this.get('indentationSpacing');
      if (!parent.get('isRoot')) {
        indentation = parent.get('indentation');
        indentation += (indentType === 'half' ? spacing / 2 : spacing);
      }
    }
    this.set('groupingLevel', groupingLevel);
    this.set('indentation', indentation);
    return this.set('isShowing', isShowing);
  },
  computeRowStyle: function(maxLevels) {
    var level;
    level = this.getFormattingLevel(this.get('groupingLevel'), maxLevels);
    return this.set('rowStyle', "ember-table-row-style-" + level);
  },
  recursiveCollapse: function(isCollapsed) {
    this.set('isCollapsed', isCollapsed);
    return this.get('children').forEach(function(child) {
      return child.recursiveCollapse(isCollapsed);
    });
  },
  getFormattingLevel: function(level, maxLevels) {
    switch (maxLevels) {
      case 1:
        return 5;
      case 2:
        if (level === 1) {
          return 2;
        }
        return 5;
      case 3:
        if (level === 1) {
          return 1;
        }
        if (level === 2) {
          return 3;
        }
        return 5;
      case 4:
        if (level === 1) {
          return 1;
        }
        if (level === 2) {
          return 2;
        }
        if (level === 4) {
          return 4;
        }
        return 5;
      case 5:
        return level;
      default:
        if (level === maxLevels) {
          return 5;
        }
        return Math.min(level, 4);
    }
  }
});

*/