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
