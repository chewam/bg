var app = angular.module('bgTest', []);

app.directive('focus', function() {
    return {
        link: function($scope, el, attrs) {
            $scope.$watch(attrs.focus, function(value) {
                if (value === true) {
                    el[0].focus();
                    $scope[attrs.focus] = false;
                }
            });
        }
    };
});

var MainController = function($scope, $timeout) {

    var getRandomIndex = function(from, to) {
        var l = $scope.lastIndexes.length,
            index = $scope.lastIndexes[l - 1];

        to = to - from + 1;
        while (index === undefined || $scope.lastIndexes.indexOf(index) !== -1) {
            index = Math.floor(Math.random() * to + from);
        }

        return index;
    };

    var loadQuestion = function() {
        var index, question,
            l = $scope.dico.length,
            lang = $scope.questionLanguage;

        if ($scope.lastIndexes.length === l) {
            $scope.lastIndexes.length = 0;
        }
        index = getRandomIndex(0, l - 1);
        $scope.lastIndexes.push(index);
        question = $scope.dico[index];

        $scope.response = '';
        $scope.success = false;
        $scope.focusTextarea = true;
        $scope.question = question[lang][0];
    };

    var validate = function() {
        var lang = $scope.responseLanguage,
            l = $scope.lastIndexes.length,
            lastIndex = $scope.lastIndexes[l - 1],
            responses = $scope.dico[lastIndex][lang],
            response = $scope.response.toUpperCase();

        $scope.success = !!(responses.indexOf(response) !== -1);
    };

    var setLanguage = function(lang) {
        $scope.questionLanguage = lang;
        if (lang === 'bg') {
            $scope.responseLanguage = 'fr';
        } else {
            $scope.responseLanguage = 'bg';
        }
    };

    var showResult = function(callback) {
        if ($scope.success === false) {
            var lang = $scope.responseLanguage,
                l = $scope.lastIndexes.length,
                lastIndex = $scope.lastIndexes[l - 1],
                response = $scope.dico[lastIndex][lang][0];

            $scope.errorCount++;
            $timeout(callback, 2000);
            $scope.success = 'error';
            $scope.question = response;
        } else {
            $scope.successCount++;
            callback();
        }
    };

    $scope.reset = function() {
        $scope.errorCount = 0;
        $scope.successCount = 0;
        $scope.lastIndexes.length = 0;
        loadQuestion();
    };

    $scope.onResponseChange = function() {
        validate();
    };

    $scope.nextQuestion = function() {
        showResult(function() {
            loadQuestion();
        });
    };

    $scope.changeLanguage = function(lang) {
        setLanguage(lang);
        loadQuestion();
    };

    $scope.errorCount = 0;
    $scope.successCount = 0;
    $scope.dico = __DICO__;
    $scope.lastIndexes = [];
    $scope.questionLanguage = 'bg';
    $scope.responseLanguage = 'fr';

    loadQuestion();

};
