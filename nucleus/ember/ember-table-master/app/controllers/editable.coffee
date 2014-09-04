App.EmberTableEditableController = Ember.Controller.extend
  numRows: 100
  columns: Ember.computed ->
    columnNames = ['open', 'close']
    dateColumn = Ember.Table.ColumnDefinition.create
      columnWidth: 100
      headerCellName: 'Date'
      tableCellViewClass: 'App.DatePickerTableCell'
      getCellContent: (row) -> row['date'].toString('yyyy-MM-dd')
      setCellContent: (row, value) -> row['date'] = value
    ratingColumn = Ember.Table.ColumnDefinition.create
      columnWidth: 150
      headerCellName: 'Analyst Rating'
      tableCellViewClass: 'App.RatingTableCell'
      contentPath: 'rating'
      setCellContent: (row, value) -> row['rating'] = value
    columns= columnNames.map (key, index) ->
      name = key.charAt(0).toUpperCase() + key.slice(1)
      Ember.Table.ColumnDefinition.create
        columnWidth: 100
        headerCellName: name
        tableCellViewClass: 'App.EditableTableCell'
        getCellContent: (row) -> row[key].toFixed(2)
        setCellContent: (row, value) -> row[key] = +value
    columns.unshift(ratingColumn)
    columns.unshift(dateColumn)
    columns
  .property()

  content: Ember.computed ->
    [0...@get('numRows')].map (num, idx) ->
      index: idx
      date:  Date.now().add(days: idx)
      open:  Math.random() * 100 - 50
      close: Math.random() * 100 - 50
      rating:Math.round(Math.random() * 4)
  .property 'numRows'
