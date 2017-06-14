$(document).ready(function() {
  $('.container > .row .plot-input')
    .on('keyup', function(e) {
    
    var self = this;
    var input = $(self).val();
    var numbers = input.split(' ');
    var numbersSorted = numbers.sort();
    
    var output = '';
    
    var lastDigit = 0;
    
    var leafNumbers = [];
    
    $.each(numbersSorted, function(key, value) {
      var numberOfDigits = value.length;
      var splitIndex = numberOfDigits - 1;
      
      var stemOutput = '<td>' + value.substring(0, splitIndex) + '</td>';
      
      var currentDigit = value.charAt(splitIndex);
      
      if (lastDigit == 0 || currentDigit == lastDigit) {
        leafNumbers.push(currentDigit);
      }
      var leafOutput = leafNumbers.join(' ');
      output += '<tr>' + stemOutput + '<td>' + leafOutput + '</td></tr>';
      
      lastDigit = currentDigit;
    });
    
    $(self).siblings('.plot-results').children('table').html(output);
  });
});
