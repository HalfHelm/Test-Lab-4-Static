using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(menuName = "Character Unit Data")]

public class CharacterUnitData : ScriptableObject
{
    public string objectname;
    public int health;
    public int damage;

    private void OnEnable()
    {
        health = 50;
        // Verhindert löschen der SOs zwischen Szenen, wenn es in einer Szene nicht gebraucht wird
        hideFlags = HideFlags.DontUnloadUnusedAsset;
    }

}

