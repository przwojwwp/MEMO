//zmiana opakowania kart z kazda w osobnym pojemniku na wszystkie w jednym. zmniejszyc portrety i zwiekszyc ich ilosc.

var cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];

// Funkcja mieszająca elementy tablicy w losowej kolejności
function shuffle(array)
{
    for (let i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

var shuffledCards = shuffle(cards);


var loadedCards = [];

for (var i = 0; i < 12; i++)
{
    loadedCards['c' + i] = document.getElementById('c' + i);
    loadedCards['c' + i].addEventListener("click", (function (i)
    {
        return function () { revealCard(i); }
    })(i));
}


var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = 6;

function revealCard(nr)
{
    var opacityValue = $('#c' + nr).css('opacity');

    //alert('opacity: ' + opacityValue)
    //alert(nr);

    if (opacityValue != 0 && lock == false)
    {
        lock = true;


        var obraz = "url(img/" + cards[nr] + ")";

        $('#c' + nr).css('background-image', obraz);
        $('#c' + nr).removeClass('card');
        $('#c' + nr).addClass('cardA');

        if (oneVisible == false)
        {
            //first card

            oneVisible = true;
            visible_nr = nr;
            lock = false;
        }
        else
        {
            //second card

            if (cards[visible_nr] == cards[nr])
            {
                //alert("para");
                setTimeout(function () { hide2Cards(nr, visible_nr) }, 750);

            }
            else
            {
                //alert("pudlo");
                setTimeout(function () { restore2Cards(nr, visible_nr) }, 1000);

            }

            turnCounter++;
            $('.score').html('Turn counter: ' + turnCounter);
            oneVisible = false;

        }
    }


}

function hide2Cards(nr1, nr2)
{
    $('#c' + nr1).css('opacity', '0');
    $('#c' + nr2).css('opacity', '0');

    pairsLeft--;

    if (pairsLeft == 0)
    {
        $('.board').html('<h1>You win!<br>Done in ' + turnCounter + ' turns</h1>');
        $('.board').append('<button id="play-again-btn">Zagraj ponownie</button>');
        $('#play-again-btn').on('click', function ()
        {
            window.location.reload();
        });
    }

    lock = false;
}

function restore2Cards(nr1, nr2)
{
    $('#c' + nr1).css('background-image', 'url(img/karta.png)');
    $('#c' + nr1).addClass('card');
    $('#c' + nr1).removeClass('cardA');

    $('#c' + nr2).css('background-image', 'url(img/karta.png)');
    $('#c' + nr2).addClass('card');
    $('#c' + nr2).removeClass('cardA');

    lock = false;
}
