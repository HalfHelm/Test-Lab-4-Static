using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class BattleManager : MonoBehaviour
{
    public CombatStates combatState;
    public GameEvent ratTurn;
    public GameEvent pigeonTurn;
    public GameEvent enemyTurn;

    public GameEvent updateHealth;

    public IntEvent RatAttack;
    public IntEvent PigeonAttack;

    public CharacterUnitData ratData;
    public CharacterUnitData pigeonData;
    public CharacterUnitData catData;

    public int ratCombo;
    public int ratDamage;
    public int ratAnim;

    public int pigeonCombo;
    public int pigeonDamage;
    public int pigeonAnim;

    public Rat ratscript;
    public Pigeon pigeonscript;



    public bool ratIsReady;
    public bool pigeonIsReady;

    
    

    // Start is called before the first frame update
    void Start()
    {
        OnRat();   


        ratIsReady = false;
        pigeonIsReady = false;

    }

    // Update is called once per frame
    void Update()
    {
        //switch(combatState)
        //{
        //    case CombatStates.Intro:
        //        // Führen Sie Code für den Idle-Zustand aus
        //        //event jeder is waiting
        //        //entrance animation start symbol after those animations automatic switch to rat turn
        //        Debug.Log("Intro");
        //        combatState = CombatStates.RatTurn; 
        //        break;
        //    case CombatStates.RatTurn:
        //        // Führen Sie Code für den RatTurn-Zustand aus
        //        //event rat sucht attack aus und schickt die auswahl an battle manager 
        //        Debug.Log("Rat Turn");
        //        OnRat();
        //        Debug.Log("Rat Turn wurde geraised");
        //        break;
        //    case CombatStates.PigeonTurn:
        //        // Führen Sie Code für den PigeonTurn-Zustand aus
        //        // event pigeon sucht attack aus und schickt die auswahl an battle manager
        //        Debug.Log("Pigeon Turn");
        //        pigeonTurn.Raise();
        //        break;
        //    case CombatStates.EnemyTurn:
        //        // Führen Sie Code für den EnemyTurn-Zustand aus
        //        // enemy sucht attacke aus und raised event und ratte und taube hören zun
        //        Debug.Log("Enemy Turn");
        //        enemyTurn.Raise();
        //        break;
        //    case CombatStates.Victory:
        //        // Führen Sie Code für den Victory-Zustand aus
        //        break;
        //    case CombatStates.Defeat:
        //        // Führen Sie Code für den Defeat-Zustand aus
        //        break;
        //}
    }

    public void OnRat()
    {

        //combatState = CombatStates.RatTurn;
        Debug.Log("combatState = CombatStates.RatTurn_start;");
        ratTurn.Raise();
       
        
    }

    public void OnPigeon()
    {

        Debug.Log("combatState = CombatStates.PigeonTurn;");
        pigeonTurn.Raise();
        
    } 
    

    public void OnRatReturnAttack(int data, int combo, int anim)
    {
        Debug.Log("Rat Attack: " + data);
        ratCombo = combo;
        ratDamage = data;
        ratAnim = anim;
        ratIsReady = true;
        OnPigeon();
        
        
    }

    public void OnPigeonReturnAttack(int data, int combo, int anim)
    {
        Debug.Log("Pigeon Attack: " + data);
        //UpdateEnemyHealth(data);
        pigeonCombo = combo;
        pigeonDamage = data;
        pigeonAnim = anim;
        //ComboCheck();
        //RatAttack.Raise();
        pigeonIsReady = true;
        PlayerReady();
        

    }

    public void PlayerReady()
    {
        if (ratIsReady && pigeonIsReady)
        {
           Debug.Log("Both Players are ready");
            RatAttack.Raise(ratDamage, ratCombo, ratAnim);
            ratIsReady = false;
            pigeonIsReady = false;


        }
        
    }


    public void RatAttackDone()
    {
        PigeonAttack.Raise(pigeonCombo, pigeonDamage, pigeonAnim);
    }

    public void OnPigeonAttackDone()
    {
        Debug.Log("Pigeon Attack (BattleManager) Done");
        enemyTurn.Raise();
        Debug.Log("Enemy Turn wird geraised");
    }

    public void OnCatAttackDone()
    {
        //if (Random.Range(0, 100) <= 50)
        //{

        //    UpdatePigeonHealth(data);
        //    OnRatTurn();
        //}
        //else
        //{
        //    UpdateRatHealth(data);
        //    OnRatTurn();
        //}

        //ratTurn.Raise();
        //combatState = CombatStates.RatTurn;
        ratDamage = -1;
        ratCombo = -1;
        ratAnim = -1;
        pigeonDamage = -1;
        pigeonCombo = -1;
        pigeonAnim = -1;

        Debug.Log("Cat Attack Done - Raise ratTurn");
        OnRat();


    }


    //public void ComboCheck()
    //{
    //    if (ratCombo != 0 && pigeonCombo != 0)
    //    {

    //        if (ratCombo == 1 && pigeonCombo == 1)
    //        {
    //            Debug.Log("Combo1");
    //            Debug.Log("enemy should be 'blinded' and take damge for 2 turns");
    //            OnPigeonAttackDone();

    //        }
    //        if (ratCombo == 2 && pigeonCombo == 2)
    //        {
    //            Debug.Log("Combo2");
    //            Debug.Log("enemy should take damage sum of both attacks x 1.5");
    //            OnPigeonAttackDone();

    //        }

    //        Debug.Log("No Combo");
    //        OnPigeonAttackDone();
    //    }
  
    //}
 public void UpdateEnemyHealth(int data, int combo, int anim)
    {
        catData.health -= data;

        Debug.Log("Katze verliert " + data + " Leben");
        Debug.Log("Cat Health: " + catData.health + "(nach updateHealth)");

        if(catData.health <= 0)
        {
            Debug.Log("Cat is dead");
            //combatState = CombatStates.Defeat;
            SceneManager.LoadScene("Win");

        }
       
        

    }

  
    public void UpdateHealth(int data, int combo, int anim)
    {
        int prob = Random.Range(0, 100);
        if (Random.Range(0, 100) <= 50)
        {
            pigeonData.health -= data;
            //ratscript.currentHealth -= data;
            if (pigeonData.health <= 0)
            {
                Debug.Log("Pigeon is dead");
                //combatState = CombatStates.Victory;
                SceneManager.LoadScene("Lose");
            }
        }
        else
        {
            ratData.health -= data;
            //pigeonscript.currentHealth -= data;
            if (ratData.health <= 0)
            {
                Debug.Log("Rat is dead");
                //combatState = CombatStates.Victory;
                SceneManager.LoadScene("Lose");
            }
        }   
        
    }

    public enum CombatStates
    {
        Intro,
        RatTurn,
        PigeonTurn,
        EnemyTurn,
        Victory,
        Defeat
    }
 
   
}
