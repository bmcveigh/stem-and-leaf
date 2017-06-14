(function($) {
  var StemLeaf = StemLeaf ? StemLeaf : {};

  StemLeaf.Generator = (function () {
    var self = this;

    function Generator() {
      StemLeaf.eventHandler.registerEvents();
    }

    StemLeaf.eventHandler = {
      
      registerEvents: function() {
        $('.container > .row .plot-input')
          .on('keyup', function(e) {
          
          if (e.which != 13) {
            return false;
          }

          var self = this;
          var input = $(self).val();
          var numbers = input.split(' ');
          var numbersSorted = numbers.sort();
          
          var lastStemNumber = 0;
          
          var leafNumbers = [];

          var addedStemNumbers = [];
          
          $.each(numbersSorted, function(key, value) {
            var numberOfDigits = value.length;
            var splitIndex = numberOfDigits - 1;
            
            var currentDigit = value.charAt(splitIndex);
            var currentStemNumber = value.substring(0, splitIndex);

            if (currentStemNumber != lastStemNumber) {
              leafNumbers = [];
            }

            leafNumbers.push(currentDigit);

            var $row = $('tr[data-stem-number="' + currentStemNumber + '"]');

            if (!$row.length) {
              var stemOutput = currentStemNumber;

              var leafOutput = leafNumbers.join(' ');
              var output = '<tr data-stem-number="' + currentStemNumber + '"><td>' + stemOutput + '</td><td> ' + currentDigit + '</td></tr>';
              $(self).siblings('.plot-results').children('table').find('tbody').append(output);

              addedStemNumbers.push(currentStemNumber);
              
            }
            else {
              var $leafCell = $(self).siblings('.plot-results').children('table').find('tbody > tr[data-stem-number="' + currentStemNumber + '"] > td:last');
              $leafCell.html(leafNumbers.join(' '));
            }

            lastStemNumber = currentStemNumber;
          });

          if (input == '') {
            $('table > tbody').html('');
          }
        });
      }

    };

    return Generator;
  })();

  $(document).ready(function() {
    $('.stem-leaf-app').each(function (i, element) {
      new StemLeaf.Generator();
    });
  });
})(jQuery);
