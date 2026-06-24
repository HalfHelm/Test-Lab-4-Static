using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RaiseEnemyTurn : MonoBehaviour
{
    public GameEvent enemyTurn;

    public void raiseEnemyTurn()
    {
        enemyTurn.Raise();
    }
}
