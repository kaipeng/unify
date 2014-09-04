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