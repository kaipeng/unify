App.EmberTableSparklineController = Ember.Controller.extend
  numRows: 100
  columns: Ember.computed ->
    name = Ember.Table.ColumnDefinition.create
      columnWidth: 100
      headerCellName: 'Name'
      getCellContent: (row) -> 'Asset ' + row['name']
    open = Ember.Table.ColumnDefinition.create
      columnWidth: 100
      headerCellName: 'Open'
      getCellContent: (row) -> row['open'].toFixed(2)
    spark = Ember.Table.ColumnDefinition.create
      columnWidth: 200
      headerCellName: 'Sparkline'
      tableCellViewClass: 'App.SparkLineTableCellView'
      contentPath: 'timeseries'
    close = Ember.Table.ColumnDefinition.create
      columnWidth: 100
      headerCellName: 'Close'
      getCellContent: (row) -> row['close'].toFixed(2)
    low = Ember.Table.ColumnDefinition.create
      columnWidth: 100
      headerCellName: 'Low'
      getCellContent: (row) -> row['low'].toFixed(2)
    high = Ember.Table.ColumnDefinition.create
      columnWidth: 100
      headerCellName: 'High'
      getCellContent: (row) -> row['high'].toFixed(2)
    [name, open, spark, close, low, high]

  content: Ember.computed ->
    randomWalk = (numSteps) ->
      lastValue = 0
      [0...numSteps].map ->
        lastValue = lastValue + d3.random.normal()()

    [0...@get('numRows')].map (num, index) ->
      data = randomWalk(100)
      name: index
      timeseries: data
      open:  data[0]
      close: data[99]
      low:   Math.min.apply(null, data)
      high:  Math.max.apply(null, data)
   .property 'numRows'
