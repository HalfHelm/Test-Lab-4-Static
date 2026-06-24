using System.Collections;
using System.Collections.Generic;
using UnityEngine;


[CreateAssetMenu]
public class IntEvent : ScriptableObject
{
    private List<IntEventListener> listeners =
        new List<IntEventListener>();

    public void Raise(int data, int combo, int anim)
    {
        for (int i = listeners.Count - 1; i >= 0; i--)
            listeners[i].OnEventRaised(data, combo, anim);
    }

    public void RegisterListener(IntEventListener listener)
    {
        listeners.Add(listener);
    }

    public void UnregisterListener(IntEventListener listener)
    {
        listeners.Remove(listener);
    }
}