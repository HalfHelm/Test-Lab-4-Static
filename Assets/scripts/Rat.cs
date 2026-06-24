using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

public class Rat : MonoBehaviour
{
    public CharacterUnitData ratData;
    public int currentHealth;
    //public CombatState currentState;
    public RatState currentState;
    public IntEvent RatChoseAttackEvent;
    public GameEvent RatAttackDone;

    public GameEvent SelectWheelVisible;
    public GameEvent SelectWheelInvisible;

    public IntEvent UpdateEnemyHealth;

    public Animator animator;

    public Dictionary<int, AnimationClip> RatDictionary = new Dictionary<int, AnimationClip>();
    public AnimationClip bite;
    public AnimationClip poison;
    public AnimationClip healrat;

    public ParticleSystem healvfx;
    public GameObject playerHealTarget;
    public Vector3 vfxpos;

    public ParticleSystem BitePS;
    public ParticleSystem PoisonPS;

    [Header("Audio")]
    public AK.Wwise.Event ratPoisonSund;
    public AK.Wwise.Event ratBiteSound;
    public AK.Wwise.Event ratHealSound;

    // Start is called before the first frame update
    void Start()
    {
        currentHealth = ratData.health; 
        //currentState = RatState.Waiting;
        //Debug.Log("Rat State: " + currentState);

        RatDictionary.Add(1, bite);
        RatDictionary.Add(2, poison);  //poison animation????????
        RatDictionary.Add(3, healrat);

        vfxpos = playerHealTarget.transform.position;

    }

    // Update is called once per frame
    void Update()
    {
        switch(currentState)
        {
            case RatState.Choosing:
                // Führen Sie Code für den Idle-Zustand aus
                // buttons klickbar
                //idle animation und choosing part 
                // wieder event ready attack ahs been chosen
                break;
            case RatState.Attack:
                // Führen Sie Code für den Attack-Zustand aus
                // buttons nicht mehr klickbar/ausblenden
                // attack animation depending on button klick 
                // detuct healht from enemy according to attack oder combo
                break;
            case RatState.Waiting:
                // Führen Sie Code für den Waiting-Zustand aus
                // buttons nicht klickbar
                // idle animation
                // warten auf turn
                break;
        }

        //Debug.Log("Rat State: " + currentState);
        
    }

    public void OnRatTurn()
    {
        Debug.Log("is es rat turn??????");
        currentState = RatState.Waiting;

        if (currentState == RatState.Waiting)
        {
            Debug.Log("Rat Turn wird zu choosing");
            currentState = RatState.Choosing;
            
            //NicisGameEvent
            SelectWheelVisible.Raise();
        }
    }
    public void OnPoison()
    {
        Debug.Log("Rat State: " + currentState);
        if (currentState == RatState.Choosing)
        {
            //schicke attacke an battlemanager
            RatChoseAttackEvent.Raise(5,1,2);
            Debug.Log("Poison");
            currentState = RatState.Waiting;

            //NicisGameEvent
            SelectWheelInvisible.Raise();
        }
    }

    public void OnBite()
    {
        //animator.SetTrigger("RatBite");

        if (currentState == RatState.Choosing)
        {
            //schicke attacke an battlemanager
            RatChoseAttackEvent.Raise(3, 2, 1);
            Debug.Log("Bite");
            currentState = RatState.Waiting;

            //NicisGameEvent
            SelectWheelInvisible.Raise();
        }
    }
    public void OnHeal()
    {
        if (currentState == RatState.Choosing)
        {
            //schicke attacke an battlemanager
            ratData.health += 5;
            RatChoseAttackEvent.Raise(0, 0, 0);
            
            currentState = RatState.Waiting;

            //NicisGameEvent
            SelectWheelInvisible.Raise();
        }
    }

    public void OnRatAttack(int data, int combo, int anim)
    {
        Debug.Log("rat animation should play now"); //<- wartet bis animation fertig ist
        currentState = RatState.Attack;
        //animator.Play(anim);

        //if (RatDictionary.ContainsKey(anim))
        //{
        //    AnimationClip clipToPlay = RatDictionary[anim];
        //    animator.Play(clipToPlay.name); // Play the animation by name
        //}
        //else
        //{
        //    Debug.LogWarning("No animation found for the given key: " + anim);
        //}
        
        if (anim == 1)
        {
            animator.SetTrigger("RatBite");
            //UpdateEnemyHealth.Raise(3,2,1);

        }
        if(anim == 2)
        {
            animator.SetTrigger("RatPoison");
            //UpdateEnemyHealth.Raise(5, 1, 2);
        }
        if(anim == 0)
        {
            //vfx abspielen
            //Instantiate(healvfx, vfxpos, Quaternion.identity);

            healvfx.Play();
            //rat heal sound
            ratHealSound?.Post(gameObject);
            StartCoroutine(ratAttack());
        }

        //play animations vfx and audio Event in Animation thats times with when enemy health should be updated and when vfx and audio plays in battlemanager
        //switch back to waiting

        //currentState = RatState.Waiting;


    }

    IEnumerator ratAttack()
    {
        yield return new WaitForSeconds(2);
        ratAttackOver();
    }

    public void ratAttackOver()
    {
        //currentState = RatState.Waiting;
        RatAttackDone.Raise();
        currentState = RatState.Waiting;
    }

    public void ImpactEnemyHealthUpdate()
    {
        if (animator.GetCurrentAnimatorStateInfo(0).IsName("RatBite"))
        {
            UpdateEnemyHealth.Raise(3, 2, 1);
            BitePS.Play();

            //TODO rat bite sound
            ratBiteSound?.Post(gameObject);
        }
        if (animator.GetCurrentAnimatorStateInfo(0).IsName("RatPoison"))
        {
            UpdateEnemyHealth.Raise(5, 1, 2);
            PoisonPS.Play();

            //rat poison sound
            ratPoisonSund?.Post(gameObject);
        }
    }

    public enum RatState
    {
        Choosing,
        Attack,
        Waiting,
    }

}
