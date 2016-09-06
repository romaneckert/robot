var Robot = {

    timer : null,

    init : function() {
        $(document).ready(this.handleDocumentReady.bind(this));
    },

    handleDocumentReady : function() {

        $('body').on('click', 'a', this.handleButtonClick.bind(this));

        this.update();
    },

    update : function() {
        $.get('/robot/data', this.handleUpdateSuccess.bind(this)).fail(this.handleUpdateFail.bind(this));
    },

    handleUpdateSuccess : function(data) {

        $('#header-nav .navbar-brand span').removeClass('flashing');

        if(data.logs) {

            var $logContainer = $('.logs');

            if($logContainer.length > 0) {

                $logContainer.html('');

                $.each(data.logs, function(l, log) {

                    var $logEntry = $('<div class="entry"/>')

                    $.each(log, function(key, value) {
                        $logEntry.append('<span class="' + key + '">' + value + '</span>');
                    });

                    $logContainer.append($logEntry);
                });
            }


        }

        setTimeout(this.update.bind(this), 100);

    },

    handleUpdateFail : function(data) {

        $('#header-nav .navbar-brand span').addClass('flashing');

        setTimeout(this.update.bind(this), 100);

    },

    handleButtonClick : function(e) {
        var $button = $(e.currentTarget);
        var action = $button.data('action');

        $('body').append('<div id="loading"><span class="glyphicon glyphicon-repeat spinner"></span></div>');

        if(action) {
            e.preventDefault();

            switch(action) {
                case '':
                default:
                    $.get('/robot/' + action, function(data) {
                        $('#content').html(data);
                        $('#loading').remove();
                    }.bind(this)).fail(function() {
                        $('#content').html('error in action ' + action);
                        $('#loading').remove();
                    });
                    break;
            }
        }
    }

};

Robot.init();