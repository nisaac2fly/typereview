angular.module('ReviewApp')
    .controller('ReviewController', function ($scope, $rootScope, $http, $log) {
        $rootScope.PAGE = "all";

        $scope.showNames = true;

        $scope.types = [];

        $scope.incorrectAnswers = 0;

        $scope.quizFilter = "";

        $http.get('data/data.json')
            .success(function (data) {
                $log.debug('Data retreived: ', data);
                $scope.types = randomize(data);
            })
            .error(function (error) {
                $log.error('An error has occored: ', error);
            });

        $scope.nameVisable = true;

        $scope.toggleNames = function () {
            $scope.showNames = ($scope.showNames == true ? false : true);
        };

        $scope.toggleQuiz = function () {

            switch ($scope.quizFilter) {
                case "quiz1":
                    $scope.quizFilter = "quiz2";
                    break;
                case "quiz2":
                    $scope.quizFilter = "";
                    break;
                case "":
                    $scope.quizFilter = "quiz1";
                    break;
            }
        };

        $scope.check = function() {
            $scope.incorrectAnswers = 0;

            angular.forEach($scope.types, function(value, key) {
                $log.debug('Value, Key: ', value, key);

                if(angular.lowercase(value.name) !== angular.lowercase(value.answer)) {
                    $scope.incorrectAnswers += 1;
                    $scope.types[key].correct = false;
                } else {
                    $scope.types[key].correct = true;
                }
            });

            $log.debug('Types debug: ', $scope.types);
        };

        $scope.reset = function() {
            var resetTypes = $scope.types;

            angular.forEach(resetTypes, function(value, key) {
                resetTypes[key].correct = true;
                resetTypes[key].answer = "";
            });

            $scope.incorrectAnswers = 0;

            $scope.types = randomize(resetTypes);
        }

        /**
         * Randomize an array
         *
         * @param array
         * @returns array
         */
        function randomize(array) {
            var currentIndex = array.length, temporaryValue, randomIndex ;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
    });
