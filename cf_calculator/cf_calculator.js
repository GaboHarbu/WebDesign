$(document).ready(function () {
    const numQuestions = 5;
    let currentQuestion = 1;

    const questions = [
        "Pregunta 1: ¿Cuántos kilómetros conduces al día?",
        "Pregunta 2: ¿Cuántas horas de luz utilizas al día?",
        "Pregunta 3: ¿Cuánta carne consumes a la semana?",
        "Pregunta 4: ¿Cuántas veces vuelas en avión al año?",
        "Pregunta 5: ¿Cuánta energía consumen tus electrodomésticos al mes?"
    ];

    function showQuestion(questionNumber) {
        $('.question').hide();
        $('#question' + questionNumber).parent('.question').show();
    }

    function updateProgressBar() {
        const progress = (currentQuestion / numQuestions) * 100;
        $('#progress-bar').width(`${progress}%`);
        $('#progress-bar').attr('aria-valuenow', progress);
        $('#progress-text').text(`${Math.round(progress)}% completado`);
    }

    function updateRangeValueDisplay() {
        const questionNumber = currentQuestion;
        const value = $('#question' + questionNumber).val();
        $('#question' + questionNumber + 'Value').text(value);
    }

    showQuestion(currentQuestion);
    updateProgressBar();
    updateRangeValueDisplay();

    $('#nextButton').click(function () {
        if (currentQuestion < numQuestions) {
            currentQuestion++;
            showQuestion(currentQuestion);
            updateProgressBar();
            updateRangeValueDisplay();
        }
        if (currentQuestion === numQuestions) {
            $('#nextButton').hide();
            $('#calculateButton').show();
        }
        if (currentQuestion > 1) {
            $('#backButton').show();
        }
    });

    $('#backButton').click(function () {
        if (currentQuestion > 1) {
            currentQuestion--;
            showQuestion(currentQuestion);
            updateProgressBar();
            updateRangeValueDisplay();
        }
        if (currentQuestion === 1) {
            $('#backButton').hide();
        }
        if (currentQuestion < numQuestions) {
            $('#nextButton').show();
            $('#calculateButton').hide();
        }
    });

    $('input[type="range"]').on('input', function () {
        updateRangeValueDisplay();
    });

    $('#calculateButton').click(function () {
        const respuestas = [];
        for (let i = 1; i <= numQuestions; i++) {
            respuestas.push(parseFloat($('#question' + i).val()));
        }

        const resultadoCalculado = respuestas.reduce((acc, respuesta) => acc + respuesta, 0) * 365;

        $('#carbonFootprintResult').text(resultadoCalculado.toFixed(0) + " kg CO2");

        const arbolesNecesarios = resultadoCalculado / 22; // Suponiendo que un árbol absorbe aproximadamente 22 kg de CO2 al año
        $('#treeEquivalent').text(arbolesNecesarios.toFixed(0));

        const viajesALaLunaEquivalentes = resultadoCalculado / 384400 ; // Distancia promedio a la Luna en km
        const kgCO2PorKilometroCohete = 0.05; // Estimación de emisión de CO2 por kilómetro lanzado por un cohete

        const viajesCoheteEquivalentes = viajesALaLunaEquivalentes * kgCO2PorKilometroCohete;
        $('#moonTripsEquivalent').text(viajesCoheteEquivalentes.toFixed(2));

        const kilometrosEnAutoEquivalentes = resultadoCalculado / 0.12; // Suponiendo 0.12 kg de CO2 por kilómetro en un automóvil promedio
        $('#carEquivalent').text(kilometrosEnAutoEquivalentes.toFixed(0));

        const botellasDePlasticoEquivalentes = resultadoCalculado / 0.05; // Suponiendo 0.05 kg de CO2 por botella de plástico no reciclada
        $('#plasticBottlesEquivalent').text(botellasDePlasticoEquivalentes.toFixed(0));

        $('#resultContainer').show();
    });

    function updateProgressBar() {
        const progress = (currentQuestion / numQuestions) * 100;
        $('#progress-bar').width(`${progress}%`);
        $('#progress-bar').attr('aria-valuenow', progress);
        $('#progress-text').text(`${Math.round(progress)}% completado`);
    }

    function updateProgressBar() {
        const progress = (currentQuestion / numQuestions) * 100;
        $('#progress-bar').width(`${progress}%`);
        $('#progress-bar').attr('aria-valuenow', progress);
        $('#progress-text').text(`${Math.round(progress)}% completado`);
        
        if (currentQuestion < numQuestions) {
            $('#progress-bar').addClass('progress-bar-remaining');
        } else {
            $('#progress-bar').removeClass('progress-bar-remaining');
        }
    }
});
