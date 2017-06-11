# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->
  $('#glucose_unit_created_at').datetimepicker({ format: 'YYYY-MM-DD HH:mm' })
  $('#glucose_unit_to_date').datepicker({ dateFormat: 'yy-mm-dd' })
  $('.table').DataTable {}
  return
