#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr  7 14:40:53 2023

@author: amisha

TRIAL TYPES: 
    A. 1) Probe 1 --> Intervening --> Final 
       2) Probe 2 --> Intervening --> Final 
    
    B. 1) Intervening 1 --> Probe 1 --> Final
       2) Intervening 2 --> Probe 2 --> Final 

- Length of intervening states can vary from (0-5)
- Participants can see two sequences with the same final state and the
  same chain of intervening states (with differing lengths), only if probes
  are different
    
"""
import pandas as pd

final_states = pd.read_csv('final_states.csv')
intervening = pd.read_csv('intervening_states.csv')
prior_probe1 = pd.read_csv('prior_states_probe1.csv')
prior_probe2 = pd.read_csv('prior_states_probe2.csv')
probe_states = pd.read_csv('probe_states.csv')

#%% Create sequences 

def compute_intervening_seq(full_seq, num_state, length):
    return list(full_seq.iloc[num_state][len(intervening.columns)-length:].values)

def generate_trialA_combos(probe_type, num_state, length):
    seq = compute_intervening_seq(intervening, num_state, length)
    seq.insert(0, probe_states[probe_type][num_state])
    seq.append(final_states['x'][num_state])
    return seq 

def generate_trialB_combos(probe_type, num_state, length):
    intervening_priors = {'V1': prior_probe1, 'V2': prior_probe2}
    seq = compute_intervening_seq(intervening_priors[probe_type], num_state, length)
    seq.insert(0, probe_states[probe_type][num_state])
    seq.append(final_states['x'][num_state])
    print(seq)
    return seq 

all_sequences = [] 

for num_state in range(len(final_states['x'])):
    #print(final_states['x'][num_state], intervening.iloc[num_state])
    for probe_type in probe_states.columns:
        sequence_A = [] 
        sequence_B = [] 
        for length in range(6):
            sequence_A.append(generate_trialA_combos(probe_type, num_state, length))
            sequence_B.append(generate_trialB_combos(probe_type, num_state, length))
        all_sequences.append(sequence_A)
        all_sequences.append(sequence_B)

    
    
    
    
    
    