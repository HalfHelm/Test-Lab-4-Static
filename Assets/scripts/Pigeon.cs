using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using static Rat;

public class Pigeon : MonoBehaviour
{
    public PigeonState currentState;
    public CharacterUnitData pigeonData;
    public int currentHealth;

    public IntEvent PigeonChoseAttackEvent;
    public IntEvent UpdateEnemyHealth;

    public GameEvent PigeonAttackDone;

    public Animator animator;

    public Dictionary<int, AnimationClip> PigeonDictionary = new Dictionary<int, AnimationClip>();
    public AnimationClip PigeonScratchAttack;
    public AnimationClip PigeonShitAttack;
    public AnimationClip healpigeon;

    public GameEvent PigeonSelectWheelVisible;
    public GameEvent PigeonSelectWheelInvisible;

    public ParticleSystem healvfx;

    public ParticleSystem ScratchPS;

    [Header("Audio")]
    public AK.Wwise.Event pigeonScratchSound;
    public AK.Wwise.Event pigeonShitSound;
    public AK.Wwise.Event pigeonHealSound;

    // Start is called before the first frame update
    void Start()
    {
        currentState = PigeonState.Waiting;
        currentHealth = pigeonData.health;


        PigeonDictionary.Add(11, PigeonScratchAttack);
        PigeonDictionary.Add(22, PigeonShitAttack);
        PigeonDictionary.Add(33, healpigeon);
    }

    // Update is called once per frame
    void Update()
    {
        switch (currentState)
        {
            case PigeonState.Choosing:
                // Führen Sie Code für den Idle-Zustand aus
                // buttons klickbar
                //idle animation und choosing part 
                // wieder event ready attack ahs been chosen
                break;
            case PigeonState.Attack:
                // Führen Sie Code für den Attack-Zustand aus
                // buttons nicht mehr klickbar/ausblenden
                // attack animation depending on button klick 
                // detuct healht from enemy according to attack oder combo
                break;
            case PigeonState.Waiting:
                // Führen Sie Code für den Waiting-Zustand aus
                // buttons nicht klickbar
                // idle animation
                // warten auf turn
                break;
        }
    
    }

    public void OnPigeonTurn()
    {
        if (currentState == PigeonState.Waiting)
        {
            currentState = PigeonState.Choosing;
            Debug.Log("Pigeon Turn wird zu choosing");

            //Nicis
            PigeonSelectWheelVisible.Raise();
        }
    }

    public void OnShit()
    {
        //animator.SetTrigger("PigeonShitAttack");

        if (currentState == PigeonState.Choosing)
        {
            //schicke attacke an battlemanager
            Debug.Log("Shit");
            PigeonChoseAttackEvent.Raise(5, 1, 22);
            currentState = PigeonState.Waiting;
            
            //Nicis
            PigeonSelectWheelInvisible.Raise();
        }
    }

    public void OnScratch()
    {
        //animator.SetTrigger("PigeonScratchAttack");

        if (currentState == PigeonState.Choosing)
        {
            Debug.Log("Scratch");
            //schicke attacke an battlemanager
            PigeonChoseAttackEvent.Raise(3, 2, 11);
            currentState = PigeonState.Waiting;

            //Nicis
            PigeonSelectWheelInvisible.Raise();
        }
    }
    public void OnHeal()
    {
        if (currentState == PigeonState.Choosing)
        {
            //schicke attacke an battlemanager
            pigeonData.health += 5;
            PigeonChoseAttackEvent.Raise(0, 0, 0);

            currentState = PigeonState.Waiting;

            //Nicis
            PigeonSelectWheelInvisible.Raise();

        }
    }

    public void OnPigeonAttack(int data, int combo, int anim)
    {
        Debug.Log("pigeon animation should play now");
        currentState = PigeonState.Attack;
     
        if(anim == 11)
        {
            animator.SetTrigger("PigeonScratchAttack");
        }
        if(anim == 22)
        {
            animator.SetTrigger("PigeonShitAttack");
        }
        if (anim == 0)
        {
            //vfx abspielen
            //Instantiate(healvfx, vfxpos, Quaternion.identity);
            healvfx.Play();
            // pigeon heal sound
            pigeonHealSound?.Post(gameObject);

            StartCoroutine(pigeonAttackDone());
        }

        //currentState = PigeonState.Waiting;

    }

    IEnumerator pigeonAttackDone()
    {
        yield return new WaitForSeconds(3);
        pigeonAttackDoneAnimation();
    }

    public void ImpactEnemyHealthUpdate()
    {
        if (animator.GetCurrentAnimatorStateInfo(0).IsName("PigeonScratchAttack 0"))
        {
            UpdateEnemyHealth.Raise(3, 2, 1);
            ScratchPS.Play();

            //pigeon scratch sound
            pigeonScratchSound?.Post(gameObject);

        }
        if (animator.GetCurrentAnimatorStateInfo(0).IsName("PigeonShitAttack"))
        {
            UpdateEnemyHealth.Raise(5, 1, 2);

            //pigeon shit sound
            pigeonShitSound?.Post(gameObject);
        }
    }

    public void pigeonAttackDoneAnimation()
    {
        //currentState = PigeonState.Waiting;
        PigeonAttackDone.Raise();
        currentState = PigeonState.Waiting;
        Debug.Log("Pigeon Attack (Pigeon) Done");
    }
    public enum PigeonState
    {
       Choosing,
       Attack,
       Waiting
    }
}
