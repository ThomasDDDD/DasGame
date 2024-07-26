# Roadmap

## Spielablauf index.js

## generierende Functionen

### Kartengenerator

    - univerell für Gegner und Spieler
    - soll bei function call: function levelGenerator -> function stat berechnen( levelgenerator, grundstats) -> return Kartenobject

## Objectverhalten spielablauf

### globale variablen

    -Grundstats für Karten als Object
    -Rundenzähler
    -Gegner Karten als Array
    -Spieler Handkarten als Array
    -Spieler Spielkarten als Array

### Gegenerkarten pro runde

    -function um 3 Spielkarten für Runde generieren lassen
    -Runde gibt multiplikator für levelGenerator weiter
    -Karten Objekte werden in Array gespeichert

### Spielerkarten erste Runde

    -function um 3 Spielkarten für erste Runde generieren zu lassen
    -multiplikator auf 1 (evtl für Schwierigkeitsgrad nutzen) für levelGenerator
    -Karten Objecte werden in Array gespeichert

### Spielerkarten fortlaufend.

    -zwei objecte: Spielkarten / Handkarten ->beides Arrays mit Objecten

### Spieler karten zwischen den runden

    -Handkarten wurden durch besiegte Gegnerkarten gefüllt
    -behaltene Spielkarten werden in Handkarten gepushed
    -Handkarten maximal 12 -Spielerkarten 0

    -> functioncall fürs paaren(Kartenobject, Kartenobject)
    -> functioncall fürs verbrennen(kartenobjekt)

    -Handkarten maximal 9 um:

    -> function call spielkarten wählen für nächste Runde

## kampfhandlung

    -function Spieler gegen gegner
        -nimmt ein Argument : Spieler Spielkarten Object
        -wählt eine gegnerkarte aus Gegnerkarten Array

    -Hp Gegner-(Angreifer Dmg * stärke */ Klasse / Gegner resistance)
    -Automatischer Gegenangriff mit selben katen bis:

    -wenn Angreifer HP <= 0 function verbrennen(Spielerkarte)
    -wenn Gegner HP <= 0 function Spieler Handkarten.push(gegnerkarte)

    -> function gegner gegen Spieler
        - wählt eine Gegnerkarte und wartet dann auf Spieler Spielkarten wahl Argument

    kampfhandlung wie zuvor

    -wenn Spieler Spielkarten Array.length <=0
        -> function spiel beenden, bestenliste Schreiben

    -wenn Gegner Karten Array.length <=0
        -> zu zwischen den runden
        -> rundenzähler +1

## paaren

    -function paaren
    -nimmt zwei Spieler Handkarten Objecte als argument
    -erzeugt ein neues Object
    -wählt für neues Object random zwischen den punkten der stats der argument objecte
    -pushed neue Karte in Handkarten Array
    -löscht Argumentkarten aus dem Handkarten Array

## verbrennen

    -function verbrennen
    -nimmt Kartenobject und ursprungs Array als Argumente
    -löscht Kartenobject aus dem ursprungs Array

## Bestenliste

    -letzes Kampfkartendeck und Handkarte plus name plus wie viele Runden durchgehalten.

=========================================================================================
stand version 0.1.0
=========================================================================================

# Visualisierung

## Npm package Blessed für Visualisierung über Terminal

    -StartBildschirm
        - Startmenu
            -Spiel starten -> Namen abfragen
            -(spiel laden) - (in späteren versionen)
            -Bestenliste anzeigen

    -permahintergrund
        - später evtl auch ändern zwischen Rude und Base

    -erste Runde:
        -wenn Enemydeck generiert wurde soll dieses mit ihren stats am oberen Bildschirmrand angezeigt werden
        -wenn SpielerKampfdeck generiert wurde soll dieses mit den stats in unterer Bildhälfte in der oberen Reihe angezeigt werden
        -zum angreifen sollen spielerkarten angeklickt und in die mitte des Bildes verschoben werden
        -wenn gegner seine karte dagegen gesetzt hat soll diese auch in die mitte rutschen
        -kampfhandlung delayen und irgendwie mit aufploppenden Schadenszahlen darstellen.
        -ist gegnerkarte gewonnen soll diese resettet ins Handdeck rutschen an den unteren bildschirmrand rutschen
        -ist spielerkarte verloren soll diese verbrennen
        -ist die Runde gewonnen sollen die restlichen Spieler Kampfkarten in das Handdeck rutschen

    -wechsel in die Base
        - Menuanzeige -main-
            -paaren / verbrennen / auf die nächste Runde vorbereiten

        - paaren
            -bis zu 12 karten am unteren Rand.
            -Karten sollen anklickbar sein und dann max zwei in die mitte des bildschirms rutschen
            -abfrage ob diese wirklich gepaart werden sollen
            -wenn ja :
                -rutschen beide Karten zusammen und erzeugen in der mitte die neue
                -visueller effekt auf neuer Karte
                -dann rutscht sie wieder nach unten
                -Menuanzeige ob mehr gepaart werden sollen/abbrechen zurück ins -main-Menu
            -wenn nein:
                -rutschen beide karten wieder nach unten
                -Menuanzeige ob mehr gepaart werden sollen/abbrechen zurück ins -main-Menu

        -verbrennen
            -bis zu 12 Karten am unteren Bildschirmrand
            -karten sollen anklickbar sein und dann max eine in die mite rutschen
            -abfrage ob diese wirklich verbrannt werden soll?
            wenn ja:
                -karte soll verbrennen
                -visueller effekt
                -Menuanzeige ob mehr verbrannt werden sollen/abbrechen zurück ins -main-Menu
            -wenn nein:
                -rutscht die karten wieder nach unten
                -Menuanzeige ob mehr verbrannt werden sollen/abbrechen zurück ins -main-Menu

        -auf die nächste Runde vorbereiten
            -max 9 Karten am unteren Rand
            -Karten sollen anklickbar sein und mit klick etwas nach oben rutschen um neues Kampfdeck zu bilden
            -sind 3 gewählt -> Menuanzeige ob man mit dier Auswahl zufrieden ist
            wenn ja:
                Bildwechsel nächste Runde..
            wenn nein:
                -die 3 Kampfkarten rutschen wieder nach unten und Auswahl beginnt von vorn

    -wechsel in die round
        -es werden wieder 3 neue Gegnerkarten am oberen Kartenrand dargestellt nach erzeugung.
