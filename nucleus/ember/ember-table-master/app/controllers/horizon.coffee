App.EmberTableHorizonController = Ember.Controller.extend
  numRows: 100

  columns: Ember.computed ->
    name = Ember.Table.ColumnDefinition.create
      columnWidth: 100
      headerCellName: 'Name'
      getCellContent: (row) -> 'Horizon ' + row['name']
    horizon = Ember.Table.ColumnDefinition.create
      columnWidth: 600
      headerCellName: 'Horizon'
      tableCellViewClass: 'App.HorizonTableCellView'
      getCellContent: Ember.K
    [name, horizon]

  content: Ember.computed ->
    normal = d3.random.normal(1.5, 3)
    [0...@get('numRows')].map (num, index) ->
      data = [0...100].map (i) -> [i, normal()]
      name: index
      data: data
   .property 'numRows'
