import random

class Dice:

    @staticmethod
    def rollD6():
        number = random.randint(1,6)        
        return number

    @staticmethod
    def rollD20():
        number = random.randint(1,20)
        return number

    @staticmethod
    def rollStats():
        nMax = 0;
        arrStats = [];
        while nMax <=3:
            number = Dice.rollD6();
            arrStats.append(number);
            nMax +=1;
        minNumber = min(arrStats);
        arrStats.remove(minNumber);
        print(arrStats);

Dice.rollStats();
