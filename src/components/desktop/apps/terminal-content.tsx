'use client'

import { useState, useRef, useEffect } from 'react'
import { hero, aboutSection, skillCategories, projects } from '@/data/info'
import { siteConfig } from '@/data/config'

const CONTACT_COMMAND = 'contact'

const JESUS_ASCII = `
⢦⣷⣾⣶⣷⣾⣶⣧⣮⣴⣥⣾⣤⣷⣬⣶⣵⣮⣶⣥⣾⣤⣧⣼⣶⣷⣾⣶⣷⣾⣶⣷⣾⣶⣷⣾⣶⣷⣾⣶⣷⣾⣶⣷⣼⣶⣵⣮⣶⣵⣮⣶⣷⣾⣶⣷⣼⣤⣧⣼⣴⣧⣼⣶⡡
⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⣛⣛⣻⣿⣟⣿⣟⣿⣛⣛⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇
⣹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⣛⣭⣶⡜⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⣿⣟⣴⣮⣝⡻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡧
⢼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⣫⣴⣿⣿⣿⣿⡟⣿⣿⣿⣿⡏⣴⢹⣿⣿⣿⡗⣿⣿⣿⣿⣿⣿⣷⣭⡻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡧
⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢟⣵⣿⣿⣿⣿⣿⣿⣿⡟⣿⣿⣿⣿⣧⣙⣼⣿⣿⣿⣇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡝⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇
⣹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣱⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⢼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢏⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡷⣿⠿⠛⠋⠉⠉⠉⠉⠙⠛⠧⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣜⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇
⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢏⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣎⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⣹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣏⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡎⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⢼⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣘⠿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⣀⣤⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⢟⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡗
⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⣿⣿⣿⣿⣿⣿⣿⣿⣷⡇⠀⠀⠀⠀⠀⣴⣾⣿⣿⣿⣿⣿⣷⣤⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣾⣿⣿⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⣹⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⢛⣋⢻⣿⣿⣿⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⠿⢷⣄⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⡟⢻⢻⣿⣿⣷⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⢼⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣷⢸⢻⢄⣿⣿⡇⠀⠀⠀⠀⡟⠛⠉⠈⢉⠻⢿⠟⠉⢀⡀⢤⡍⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⡗⣷⢸⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⢼⣿⣿⣿⣷⣷⣾⣿⣿⡇⠀⠀⠀⢠⣄⡐⢅⢀⣄⣱⢿⠠⣈⡆⠀⡀⢠⡇⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣷⣾⣾⣿⣿⡟⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⡱⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⣿⠿⢿⠿⢿⢿⡿⢿⡇⠀⠀⠀⢘⣿⣷⣾⣷⣣⣿⢸⠀⣻⣾⣷⣞⣾⠗⠀⠀⠀⠀⠀⠀⢸⢿⠿⣿⠿⡿⢿⠿⢿⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⢼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⢱⡿⣛⣛⣛⣛⣛⣛⣛⠀⠀⠀⡀⢻⣿⣿⣿⣿⠟⣾⡆⠹⣿⣿⡿⠋⠀⢀⡀⠀⠀⠀⠀⣚⣛⣛⣛⣛⣛⣛⣛⢷⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⢿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠁⠀⠻⣿⣿⠿⠂⠙⠁⠂⠿⣿⠃⠀⠀⠈⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⢧⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣎⢿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⡸⠁⢀⣠⠥⠄⢠⡀⢹⡆⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⢋⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇
⢺⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣦⢻⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠐⠛⠋⠀⠀⣰⠿⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⡿⣫⣾⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⣹⣿⣿⣿⣿⣿⣿⣷⠿⣾⢶⡾⣿⣿⣷⣝⢿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠼⠋⢎⠳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⢟⣵⣿⣿⣿⠷⠿⣶⢶⡾⣿⣿⣿⣿⣿⣿⡇
⢼⣿⣿⣿⣿⣿⣿⣿⢘⣇⢻⡗⣺⣿⣿⣿⣾⣝⢿⣿⣿⣿⣿⠟⠁⠰⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⢟⣡⣾⣿⣿⣿⣿⡇⢹⣿⢸⡗⢺⣿⣿⣿⣿⣿⡇
⠼⣿⣿⣿⣿⣿⣿⣿⣬⣿⣮⣵⣿⣿⣿⣿⣿⣿⣷⣍⡻⠟⠁⠀⠀⢠⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠑⠻⠻⠿⣿⣿⣿⣿⣼⣦⣿⣧⣥⣿⣿⣿⣿⣿⣿⡇
⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⢀⣴⡟⣿⣿⣿⣦⣀⢀⡀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⠾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⢀⣾⣿⣿⣻⣿⣿⣿⣿⣿⣿⣷⡆⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⡇
⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠰⣿⣿⣿⣽⣿⣻⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣿⣿⣿⣿⣿⡇
⢮⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠁⠀⠀⠀⠀⠀⠅⡀⠉⡻⢿⣿⣿⣿⣿⣿⣿⣿⢟⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣿⣿⣿⡏
⠼⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠐⠙⠻⠿⠿⠿⠿⠯⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⡇
⣹⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠤⠄⠀⠀⠀⠤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⡇
⢲⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⣀⣀⣀⣤⣤⠤⢄⡲⠶⣴⣡⢶⣒⠚⡖⢤⠀⠀⠀⠀⢿⣿⣇
⢎⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠕⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡆⡎⣭⠙⠛⠟⠉⢲⢘⡌⠛⢣⠻⠀⠁⠂⡀⠀⢽⠨⠀⠀⠀⠀⢸⣿⡧
⢺⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠂⠀⠀⠀⡄⠄⠀⠀⠀⠀⠀⠀⠀⢀⣰⢨⣏⡇⡃⡂⠀⠀⡒⣄⠸⡸⢶⣤⠞⣟⣔⣴⠶⠀⠀⢺⡄⠀⠀⠀⠀⠀⣿⡗
⢺⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⢀⠀⣠⡬⠔⠃⠀⠀⠀⠀⠀⠀⣴⣾⡈⢽⣗⡇⡇⡇⠀⢸⠀⠊⣀⢩⠷⢬⠻⣠⠟⣑⢄⠀⠀⠸⠀⠀⠀⠀⠀⠀⢻⢈
⣹⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠂⢠⡾⠋⡀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣄⣹⣧⡇⠇⠃⠀⢸⣀⠁⡬⢀⡀⠀⡇⣿⣈⢲⣉⠀⠀⢸⡰⠀⠀⠀⠀⠀⠘⡌
⢴⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣼⡴⠴⠤⠂⠀⢸⡇⠀⠀⠀⢀⢻⣿⢵⢛⢇⡃⡄⠃⠀⢺⢠⢛⠲⡦⠀⠀⡗⠫⢬⠞⣈⡴⠖⢼⢘⠀⠀⠀⠀⠀⠀⡘
⢺⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣞⣭⣴⠶⠶⠴⠂⠀⢀⣱⠀⠀⠀⢸⢜⢔⡮⡒⡝⡂⢀⢁⠎⣅⡠⠊⠐⠁⠁⠀⠁⠀⢠⡛⣡⠊⠉⢻⠸⠀⠀⠀⠀⠀⠀⡘
⢹⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢺⣿⠀⠀⢀⠄⠀⠑⢸⡇⠀⠀⠀⢸⣱⠇⡆⣯⡗⠁⠸⠈⠈⡰⠫⠠⠀⠒⠀⠀⠀⠤⣓⡀⡗⢦⡔⢾⣂⠁⠀⠀⠀⠀⠀⡘
⢣⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣇⠀⠀⠊⣠⣶⠘⠀⠀⠀⠀⢸⡿⠃⡧⡷⣏⢱⢨⠱⠆⡑⠿⢃⣜⡃⠀⠀⠈⣛⠶⢺⠑⡣⠼⣴⠸⠀⠀⠀⠀⠀⠀⢘
⡡⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⡄⠀⣰⣿⣿⠆⠀⠀⠀⠀⣰⡇⠃⣇⣿⡇⢸⢐⠈⠙⠰⡄⣛⠶⣁⠀⠀⡄⢯⡢⢋⠆⠇⢀⡾⠘⠀⠀⠀⠀⠀⠀⢌
⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⡇⠀⣯⣿⠁⠀⠀⠀⠀⠀⣿⣃⡻⣝⠯⡁⢄⠸⠀⠀⠃⢥⡚⠜⠀⠀⠀⢠⠀⠒⢅⡀⡄⠀⡥⢆⠀⠀⠀⠀⠀⠀⢌
⢩⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⠓⡔⠉⠀⠀⠀⠀⠀⠀⠰⣱⠶⠶⠬⣥⣄⡈⠐⠀⢸⠀⡁⠀⡨⠄⣀⡤⡈⢨⠗⠉⠂⠁⠀⠉⠀⠀⠀⠀⠀⠀⠀⢌
⡡⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠆⠆⣰⣠⣴⣿⣿⣷⣦⡀⠀⠁⠀⠐⠲⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢌
⡡⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣲⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡌
⡡⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣮⣿⣭⣿⣿⣿⣿⣿⠿⠍⡂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡘
⡡⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠲⣶⣥⣼⣿⣩⣽⠯⢛⠥⡺⠅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡱
⡡⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠚⠖⠢⠩⠔⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱
`

interface HistoryEntry {
  command: string
  output: string
  isContact?: boolean
}

export function TerminalContent() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [history])

  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase()
    let output = ''
    let isContact = false

    switch (cmd) {
      case 'help':
        output = `Available commands:
  help     - Show this help message
  about    - About me
  skills   - List my skills
  projects - Show my projects
  contact  - Contact information
  clear    - Clear terminal
  whoami   - Who am I?
  date     - Show current date
  echo     - Echo a message
  love     - Displays the love of Giovanni’s life.
`
        break

      case 'about':
        output = `${hero.name}
${hero.badge}

${aboutSection.paragraphs.join('\n\n')}`
        break

      case 'skills':
        output = skillCategories.map((category) => `${category.title}: ${category.technologies.join(', ')}`).join('\n')
        break

      case 'projects':
        output = `Professional Experience & Projects:

${projects.map((p) => `[${p.number}] ${p.title} - ${p.category} (${p.year})`).join('\n')}

Type 'project <number>' for details (e.g., 'project 01')`
        break

      case CONTACT_COMMAND:
        isContact = true
        output = 'contact'
        break

      case 'clear':
        setHistory([])
        setCurrentInput('')
        return

      case 'whoami':
        output = 'guest@cruz-os'
        break

      case 'date':
        output = new Date().toString()
        break

      case 'jesus':
      case 'faith':
      case 'god':
      case 'love':
        output = JESUS_ASCII
        break

      case '':
        output = ''
        break

      default:
        if (cmd.startsWith('echo ')) {
          output = command.slice(5)
        } else if (cmd.startsWith('project ')) {
          const num = cmd.slice(8).trim()
          const project = projects.find((p) => p.number === num)
          if (project) {
            const link = project.repo || project.demo || ''
            output = `${project.title}
${project.category}
Period: ${project.year}
Tech: ${project.tech}
Type: ${project.type === 'experience' ? 'Professional Experience' : 'Personal Project'}
${link ? `Link: ${link}` : ''}`
          } else {
            output = `Project '${num}' not found. Type 'projects' to see available projects.`
          }
        } else {
          output = `command not found: ${command}. Type 'help' for available commands.`
        }
    }

    setHistory((prev) => [...prev, { command, output, isContact }])
    setCurrentInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput)
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  // Render contact output with clickable links
  const renderContactOutput = () => (
    <div className="text-[#cccccc] mt-1 ml-0">
      <p>
        Email:{' '}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-[#00aaff] hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {siteConfig.email}
        </a>
      </p>
      <p>Location: {siteConfig.location}</p>
      <p>
        GitHub:{' '}
        <a
          href={siteConfig.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00aaff] hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {siteConfig.socials.github}
        </a>
      </p>
      <p>
        LinkedIn:{' '}
        <a
          href={siteConfig.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00aaff] hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {siteConfig.socials.linkedin}
        </a>
      </p>
    </div>
  )

  return (
    <main
      ref={terminalRef}
      className="h-full bg-[#1a1a1a] text-[#00ff00] font-mono text-xs md:text-sm p-3 cursor-text"
      style={{
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
      onClick={focusInput}
    >
      {/* Welcome message */}
      <div className="mb-4 text-[#888888]">
        <p>Cruz OS Terminal v1.0</p>
        <p>Type &apos;help&apos; for available commands.</p>
        <p className="mt-2">---</p>
      </div>

      {/* Command history */}
      {history.map((entry, index) => (
        <div key={index} className="mb-2">
          <div className="flex">
            <span className="text-[#00aaff]">guest@cruz-os</span>
            <span className="text-white">:</span>
            <span className="text-[#aa00ff]">~</span>
            <span className="text-white">$&nbsp;</span>
            <span className="text-[#00ff00]">{entry.command}</span>
          </div>
          {entry.isContact
            ? renderContactOutput()
            : entry.output && <pre className="text-[#cccccc] whitespace-pre-wrap mt-1 ml-0">{entry.output}</pre>}
        </div>
      ))}

      {/* Current input line */}
      <div className="flex items-center">
        <span className="text-[#00aaff]">guest@cruz-os</span>
        <span className="text-white">:</span>
        <span className="text-[#aa00ff]">~</span>
        <span className="text-white">$&nbsp;</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-[#00ff00] outline-none border-none caret-[#00ff00]"
          autoFocus
          spellCheck={false}
        />
      </div>
    </main>
  )
}
