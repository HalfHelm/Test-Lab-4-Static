using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using UnityEngine;

public class Cat : MonoBehaviour
{
    public CharacterUnitData catData;
    public int currentHealth; 
    
    public CatState currentState; 
    
    public GameEvent CatChoseAttackEvent;
    

    public Animator animator;

    public IntEvent updatePlayerHealth;

    [Header("Audio")]
    public AK.Wwise.Event catHeal;
    public AK.Wwise.Event catScratch;

    // Start is called before the first frame update
    void Start()
    {
        
        currentHealth = catData.health; 
        currentState = CatState.Idle;
    }

    // Update is called once per frame
    void Update()
    {
        switch (currentState)
        {
            case CatState.Idle:
                // Führen Sie Code für den Idle-Zustand aus
                break;
            case CatState.Attack:
                // Führen Sie Code für den Attack-Zustand aus
                //if health 30% probability for heal higher
                break;
                case CatState.Rage: 
                    // Führen Sie Code für den Rage-Zustand aus
                    //if health 30% probability for heal higher
                    break;
            case CatState.Dead:
                // Führen Sie Code für den Dead-Zustand aus
                break;
        }
    }

    public void OnAttack()
    {
        if (catData.health >= 30)
        {
            currentState = CatState.Attack;
            if (Random.Range(0, 100) <= 90)
            {

                OnScratch();
                Debug.Log("Cat Scratch");
                
                
            }
            else
            {
                OnHeal();
                Debug.Log("Cat Heal");
            }
        }
        else if(catData.health < 30)
        {
            currentState = CatState.Rage;
            if (Random.Range(0, 100) <= 40)
            {
                OnScratch();
                Debug.Log("Cat Scratch");
            }
            else
            {
                OnHeal();
                Debug.Log("Cat Heal");
            }
        }
    }

    public void OnScratch()
    {
        animator.SetTrigger("CatScratch");
        // cat sound
        catScratch.Post(gameObject);
        //CatChoseAttackEvent.Raise();
        //currentState = CatState.Idle;   
        //play animations vfx and audio Event in Animation thats times with when enemy player health should be updated and when vfx and audio plays in battlemanager

    }

    public void CatAttackOver()
    {
        Debug.Log("Cat Attack Over von cat script");
        CatChoseAttackEvent.Raise();
    }

    public void UpdatePlayerHealth()
    {
        Debug.Log("Update Player Health vno cat script");
        updatePlayerHealth.Raise(5, 0, 0);
    }

    public void OnHeal()
    {
        animator.SetTrigger("CatHeal");

        // cat sound
        catHeal.Post(gameObject);

        catData.health += 5;
        if(catData.health > 50)
        {
            catData.health = 50;
        }
        //CatChoseAttackEvent.Raise();
    }

    //public void UpdateHealth()
    //{
    //    currentHealth = catData.health; 
    //}

    public enum CatState
    {
        Idle,
        Attack,
        Rage,
        Dead
    }
}
