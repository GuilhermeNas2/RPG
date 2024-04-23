from classe import Persona
from dice import Dice


class Bard(Persona):

    def __init__(self, nome, nivel, raca, classe):
        self.nome = nome;
        self.nivel = nivel
        self.raca = raca;
        self.classe = classe;
        if nivel == "1":
            self.vida = 8;
            return
        else:
            self.vida = 8 + Dice.rollD6(8,nivel); 