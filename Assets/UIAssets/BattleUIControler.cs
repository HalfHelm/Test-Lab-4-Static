using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class BattleUIControler : MonoBehaviour
{
    // all ui variables
    private UIDocument _battleDoc;
    private VisualElement _pigionHealth;
    private VisualElement _ratHealth;
    private VisualElement _enemyHealth;

    private VisualElement _ratAttackWheel;
    private VisualElement _pigionAttackWheel;

    // Larissas shit
    public CharacterUnitData _soRat;
    public CharacterUnitData _soPigeon;
    public CharacterUnitData _soEnemy;

    private void Awake()
    {
        // get all ui elements
        _battleDoc = GetComponent<UIDocument>();
        _pigionHealth = _battleDoc.rootVisualElement.Q<VisualElement>("rotwingCurrentHealth");
        _ratHealth = _battleDoc.rootVisualElement.Q<VisualElement>("scourgeCurrentHealth");
        _enemyHealth = _battleDoc.rootVisualElement.Q<VisualElement>("BossCurrentHealth");

        _ratAttackWheel = _battleDoc.rootVisualElement.Q<VisualElement>("scourgeAttackWheel");
        _pigionAttackWheel = _battleDoc.rootVisualElement.Q<VisualElement>("rotwingAttackWheel");
    }

    public void Update()
    {
        UpdateRatHealthbar();
        UpdatePigeonHealthbar();
        UpdateEnemyHealthbar();
    }

    public void UpdateRatHealthbar()
    {
        // Maximale Gesundheit, die der Rat haben kann
        float maxRatHealth = 50.0f;

        // Berechnen Sie den Prozentsatz der aktuellen Gesundheit im Verhältnis zur maximalen Gesundheit
        float rathealthPercentage = (_soRat.health / maxRatHealth) * 100;

        // Setzen Sie die Breite des _ratHealth VisualElements auf den berechneten Prozentsatz
        _ratHealth.style.width = new Length(rathealthPercentage, LengthUnit.Percent);
    }

    public void UpdatePigeonHealthbar()
    {
        // Maximale Gesundheit, die die Taube haben kann
        float maxPigeonHealth = 50.0f;

        // Berechnen Sie den Prozentsatz der aktuellen Gesundheit im Verhältnis zur maximalen Gesundheit
        float pigeonhealthPercentage = (_soPigeon.health / maxPigeonHealth) * 100;

        // Setzen Sie die Breite des _pigionHealth VisualElements auf den berechneten Prozentsatz
        _pigionHealth.style.width = new Length(pigeonhealthPercentage, LengthUnit.Percent);
    }

    public void UpdateEnemyHealthbar()
    {
        // Maximale Gesundheit, die der Feind haben kann
        float maxEnemyHealth = 50.0f;

        // Berechnen Sie den Prozentsatz der aktuellen Gesundheit im Verhältnis zur maximalen Gesundheit
        float enemyhealthPercentage = (_soEnemy.health / maxEnemyHealth) * 100;

        // Setzen Sie die Breite des _enemyHealth VisualElements auf den berechneten Prozentsatz
        _enemyHealth.style.width = new Length(enemyhealthPercentage, LengthUnit.Percent);
    }

    public void MakeRatAttackWheelVisible()
    {
        // rat attack wheel = eingeblendet wenn rat turn
        _ratAttackWheel.style.opacity = 100;
    }

    public void MakePigeonAttackWheelVisible()
    {
        // pigeon attack wheel = eingeblendet wenn rat turn
        _pigionAttackWheel.style.opacity = 100;
    }

    public void MakeRatAttackWheelInvisible()
    {
        // rat attack wheel = ausgeblendet wenn rat turn vorbei
        _ratAttackWheel.style.opacity = 0;
    }

    public void MakePigeonAttackWheelInvisible()
    {
        // pigeon attack wheel = ausgeblendet wenn rat turn vorbei
        _pigionAttackWheel.style.opacity = 0;
    }

    // pigeon health = scale%
    // enemy health = scale%


    
}
