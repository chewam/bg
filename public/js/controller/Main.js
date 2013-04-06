var MainController = function($scope) {

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

        $scope.success = false;
        $scope.response = '';
        $scope.question = question[lang];
        console.log('loadQuestion', index, question);
    };

    var validate = function() {
        var lang = $scope.responseLanguage,
            l = $scope.lastIndexes.length,
            lastIndex = $scope.lastIndexes[l - 1],
            question = $scope.dico[lastIndex];

        if (question[lang] === $scope.response.toUpperCase()) {
            console.log('validate OK');
            $scope.success = true;
        } else {
            console.log('validate KO');
            $scope.success = false;
        }
    };

    var setLanguage = function(lang) {
        $scope.questionLanguage = lang;
        if (lang === 'bg') {
            $scope.responseLanguage = 'fr';
        } else {
            $scope.responseLanguage = 'bg';
        }
    };

    $scope.onResponseChange = function() {
        validate();
    };

    $scope.nextQuestion = function() {
        loadQuestion();
    };

    $scope.changeLanguage = function(lang) {
        setLanguage(lang);
        loadQuestion();
    };

    $scope.dico = __DICO__;
    $scope.lastIndexes = [];
    $scope.questionLanguage = 'bg';
    $scope.responseLanguage = 'fr';

    loadQuestion();

};
