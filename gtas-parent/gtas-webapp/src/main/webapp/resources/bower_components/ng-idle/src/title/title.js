angular.module('ngIdle.title', [])
  .provider('Title', function() {
    var options = {
      enabled: true
    };

    var setEnabled = this.enabled = function(enabled) {
      options.enabled = enabled === true;
    };

    function padLeft(nr, n, str){
      return new Array(n-String(nr).length+1).join(str||'0')+nr;
    }

    this.$get = ['$document', '$interpolate', function($document, $interpolate) {
      var state = {
        original: null,
        idle: '{{minutes}}:{{seconds}} until your session times out!',
        timedout: 'Your session has expired.'
      };

      return {
        setEnabled: setEnabled,
        isEnabled: function() {
          return options.enabled;
        },
        original: function(val) {
          if (angular.isUndefined(val)) return state.original;

          state.original = val;
        },
        store: function(overwrite) {
          if (overwrite || !state.original) state.original = this.value();
        },
        value: function(val) {
          if (angular.isUndefined(val)) return $document[0].title;

          $document[0].title = val;
        },
        idleMessage: function(val) {
          if (angular.isUndefined(val)) return state.idle;

          state.idle = val;
        },
        timedOutMessage: function(val) {
          if (angular.isUndefined(val)) return state.timedout;

          state.timedout = val;
        },
        setAsIdle: function(countdown) {
          this.store();

          var remaining = { totalSeconds: countdown };
          remaining.minutes = Math.floor(countdown/60);
          remaining.seconds = padLeft(countdown - remaining.minutes * 60, 2);

          this.value($interpolate(this.idleMessage())(remaining));
        },
        setAsTimedOut: function() {
          this.store();

          this.value(this.timedOutMessage());
        },
        restore: function() {
          if (this.original()) this.value(this.original());
        }
      };
    }];
  })
  .directive('title', ['Title', function(Title) {
      return {
        restrict: 'E',
        link: function($scope, $element, $attr) {
          if (!Title.isEnabled() || $attr.idleDisabled) return;

          Title.store(true);

          $scope.$on('IdleStart', function() {
            Title.original($element[0].innerText);
          });

          $scope.$on('IdleWarn', function(e, countdown) {
            Title.setAsIdle(countdown);
          });

          $scope.$on('IdleEnd', function() {
            Title.restore();
          });

          $scope.$on('IdleTimeout', function() {
            Title.setAsTimedOut();
          });
        }
      };
  }]);
